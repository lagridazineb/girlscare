// Run once:  npm run vapid
// Copy the printed values into Vercel -> Settings -> Environment Variables.
import webpush from "web-push";

const keys = webpush.generateVAPIDKeys();
console.log("\nAdd these to Vercel environment variables:\n");
console.log(`VAPID_PUBLIC_KEY=${keys.publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${keys.privateKey}`);
console.log(`VAPID_SUBJECT=mailto:you@example.com   # <- put your real email`);
console.log(`CRON_SECRET=${webpush.generateVAPIDKeys().privateKey}   # any long random string\n`);
