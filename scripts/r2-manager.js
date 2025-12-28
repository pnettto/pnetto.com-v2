import {
    DeleteObjectsCommand,
    HeadObjectCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { createHash } from "crypto";
import { readFile } from "fs/promises";
import fs from "fs";
import path from "path";
import pLimit from "p-limit";
import "dotenv/config";

const BUCKET_NAME = process.env.R2_BUCKET || "pnetto-images";
const LOCAL_IMG_DIR = "compiled/img";
const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    console.error("❌ Missing R2 credentials in .env file");
    console.error(
        "Required: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY",
    );
    process.exit(1);
}

const client = new S3Client({
    region: "auto",
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});

function getFilesRecursive(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? getFilesRecursive(full) : [full];
    });
}

async function getLocalETag(filePath) {
    const content = await readFile(filePath);
    return createHash("md5").update(content).digest("hex");
}

async function needsUpload(key, localFile) {
    try {
        const [remote, localETag] = await Promise.all([
            client.send(
                new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
            ),
            getLocalETag(localFile),
        ]);
        const remoteETag = remote.ETag?.replace(/"/g, "");
        return remoteETag !== localETag;
    } catch (error) {
        // Object doesn't exist remotely, needs upload
        return true;
    }
}

async function uploadFiles() {
    console.log(`🚀 Uploading images to R2 bucket: ${BUCKET_NAME}...`);

    const files = getFilesRecursive(LOCAL_IMG_DIR);
    if (files.length === 0) {
        console.log("⚠️  No files found in", LOCAL_IMG_DIR);
        return;
    }

    console.log(`📁 Found ${files.length} files`);

    const limit = pLimit(20); // 20 concurrent operations
    let skipped = 0;
    let uploaded = 0;
    let failed = 0;

    await Promise.all(files.map((file) =>
        limit(async () => {
            const relativePath = path.relative(LOCAL_IMG_DIR, file);
            const r2Key = `img/${relativePath}`;

            try {
                if (!await needsUpload(r2Key, file)) {
                    skipped++;
                    process.stdout.write(".");
                    return;
                }

                const content = await readFile(file);
                await client.send(
                    new PutObjectCommand({
                        Bucket: BUCKET_NAME,
                        Key: r2Key,
                        Body: content,
                    }),
                );

                uploaded++;
                console.log(`  ✓ ${relativePath}`);
            } catch (error) {
                failed++;
                console.error(
                    `  ✗ Failed to upload ${relativePath}:`,
                    error.message,
                );
            }
        })
    ));

    console.log("\n✔ Upload complete!");
    console.log(`  Uploaded: ${uploaded}`);
    console.log(`  Skipped: ${skipped}`);
    if (failed > 0) {
        console.log(`  Failed: ${failed}`);
    }
}

async function flushBucket(force) {
    if (!force) {
        console.log("⚠️  This will delete ALL objects in the bucket!");
        console.log(
            `To flush, run with --force: npm run r2 flush --force`,
        );
        return;
    }

    console.log(`🗑️  Flushing R2 bucket: ${BUCKET_NAME}...`);

    try {
        let continuationToken;
        let totalDeleted = 0;
        const limit = pLimit(10);

        do {
            const listResponse = await client.send(
                new ListObjectsV2Command({
                    Bucket: BUCKET_NAME,
                    ContinuationToken: continuationToken,
                    MaxKeys: 1000,
                }),
            );

            if (listResponse.Contents && listResponse.Contents.length > 0) {
                const batches = [];
                for (let i = 0; i < listResponse.Contents.length; i += 1000) {
                    batches.push(listResponse.Contents.slice(i, i + 1000));
                }

                await Promise.all(batches.map((batch) =>
                    limit(async () => {
                        await client.send(
                            new DeleteObjectsCommand({
                                Bucket: BUCKET_NAME,
                                Delete: {
                                    Objects: batch.map((obj) => ({
                                        Key: obj.Key,
                                    })),
                                    Quiet: true,
                                },
                            }),
                        );
                        totalDeleted += batch.length;
                        console.log(`  🗑️  Deleted ${totalDeleted} objects...`);
                    })
                ));
            }

            continuationToken = listResponse.NextContinuationToken;
        } while (continuationToken);

        console.log(`✔ Bucket ${BUCKET_NAME} flushed successfully!`);
        console.log(`  Total objects deleted: ${totalDeleted}`);
    } catch (error) {
        console.error("✗ Flush failed:", error.message);
        console.error("Make sure the bucket exists and you have permissions.");
        process.exit(1);
    }
}

const command = process.argv[2];

if (command === "sync") {
    uploadFiles().catch((error) => {
        console.error("❌ Upload failed:", error);
        process.exit(1);
    });
} else if (command === "flush") {
    const force = process.argv[3] === "--force";
    flushBucket(force).catch((error) => {
        console.error("❌ Flush failed:", error);
        process.exit(1);
    });
} else {
    console.log("Usage: node run r2 [sync|flush]");
    console.log("");
    console.log("Commands:");
    console.log(
        "  sync          Upload images to R2 (skips unchanged files)",
    );
    console.log("  flush --force   Delete all objects in the bucket");
}
