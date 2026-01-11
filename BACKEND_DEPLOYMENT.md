# Backend Deployment Guide - Netlify & Vercel

## Overview

Your backend has been configured to work with both **Netlify** and **Vercel** using serverless functions. This guide covers both deployment options.

---

## Architecture

Your app uses:

- **Frontend**: React + Vite (SPA)
- **Backend**: Express.js
- **Download API**: `/api/download` (NEW - CORS proxy)

The backend is deployed as **serverless functions** on both platforms:

- **Netlify**: Uses `netlify/functions/api.ts` with `serverless-http`
- **Vercel**: Uses `api/index.ts` with `serverless-http`

---

## Netlify Deployment ✅ (Currently Configured)

### Status

✅ **Already configured** - `netlify.toml` is set up

### What's Set Up

- `netlify.toml` defines the build and function settings
- `netlify/functions/api.ts` wraps Express with `serverless-http`
- API rewrites: `/api/*` → `/.netlify/functions/api/*`
- Frontend: Built to `dist/spa`

### Deploy to Netlify

**Option 1: Connect GitHub Repository**

1. Go to https://netlify.com
2. Click "New Site from Git"
3. Select your GitHub repository
4. Settings will auto-use `netlify.toml`
5. Click "Deploy Site"

**Option 2: Deploy via CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Verify Netlify Deployment

- Frontend loads at: `https://your-site.netlify.app`
- API works at: `https://your-site.netlify.app/api/download`
- Test download: Try downloading an asset, should work without CORS errors ✅

---

## Vercel Deployment ✅ (Ready to Deploy)

### Status

✅ **Configured** - Ready to deploy

- `vercel.json` defines build and rewrite settings
- `api/index.ts` wraps Express with `serverless-http`

### What's Set Up

- `vercel.json` configures serverless functions
- `api/` directory contains the handler
- API rewrites: `/api/*` → `/api` handler
- Frontend: Built to `dist/spa`

### Deploy to Vercel

**Option 1: Connect GitHub Repository**

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Vercel auto-detects settings from `vercel.json`
5. Click "Deploy"

**Option 2: Deploy via CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Verify Vercel Deployment

- Frontend loads at: `https://your-project.vercel.app`
- API works at: `https://your-project.vercel.app/api/download`
- Test download: Try downloading an asset, should work without CORS errors ✅

---

## Configuration Comparison

| Feature              | Netlify                                | Vercel            |
| -------------------- | -------------------------------------- | ----------------- |
| **Config File**      | `netlify.toml`                         | `vercel.json`     |
| **Backend Location** | `netlify/functions/`                   | `api/`            |
| **API Rewrite**      | `/api/*` → `/.netlify/functions/api/*` | `/api/*` → `/api` |
| **Node Runtime**     | `nodejs20.x` (default)                 | `nodejs20.x`      |
| **Max Duration**     | 26 seconds (free)                      | 60 seconds        |
| **Serverless HTTP**  | ✅ Configured                          | ✅ Configured     |
| **CORS Proxy**       | ✅ Works                               | ✅ Works          |

---

## Important Notes

### 1. Serverless Constraints

Both platforms have limitations:

- **Max request size**: ~6-10 MB
- **Max function duration**: 26-60 seconds
- **Environment variables**: Set in platform settings

### 2. Firebase Credentials

Your Firebase config is **public** (API keys) - this is normal for client-side Firebase.

- Ensure your Firestore/Storage rules are properly set (done ✅)
- The backend uses `serverless-http` which is stateless - no session storage

### 3. CORS Download Endpoint

The `/api/download` endpoint:

- Fetches files from Firebase Storage
- Works from any origin (no CORS issues!)
- Returns file with proper headers
- Works on both Netlify and Vercel ✅

---

## Deployment Checklist

### Before Deploying

- [ ] Firebase Storage rules are deployed (`storage.rules` → Publish)
- [ ] Environment variables are set (if needed)
- [ ] Code builds locally: `npm run build`
- [ ] Tests pass: `npm run test` (optional)

### Deploy Netlify

```bash
# Option 1: Via GitHub (auto-deploy on push)
# Just push to GitHub, Netlify auto-deploys from netlify.toml

# Option 2: Via CLI
netlify deploy --prod
```

### Deploy Vercel

```bash
# Option 1: Via GitHub (auto-deploy on push)
# Just push to GitHub, Vercel auto-deploys from vercel.json

# Option 2: Via CLI
vercel --prod
```

### After Deploying

- [ ] Test homepage loads
- [ ] Test asset listing works
- [ ] Test asset detail page works
- [ ] **Test download**: Click download button on any asset
  - Should NOT show CORS errors
  - File should download successfully ✅

---

## Troubleshooting

### Issue: /api/download returns 404

**On Netlify:**

- Check `netlify.toml` has redirect: `from = "/api/*"` → `to = "/.netlify/functions/api/:splat"`
- Verify `netlify/functions/api.ts` exists and exports handler

**On Vercel:**

- Check `vercel.json` has rewrite: `source: "/api/(.*)"` → `destination: "/api"`
- Verify `api/index.ts` exists and exports default handler

### Issue: Downloads still have CORS errors

- Check backend endpoint is actually being called (DevTools → Network)
- Verify frontend uses `/api/download` (not direct Firebase URL)
- Check browser console for actual error messages

### Issue: Firebase files not found

- Verify Storage rules allow read access
- Confirm files are actually uploaded to Firebase Storage
- Check Firebase Console → Storage for files

### Issue: Large files fail to download

Vercel has a 6 MB max response size for serverless functions. For larger files, consider:

1. Compress files before uploading
2. Use streaming (more complex)
3. Use Vercel Pro with higher limits

---

## Environment Variables (if needed)

If you add environment variables, configure them in:

**Netlify:**

- Settings → Environment variables
- Or add to `netlify.toml`:

```toml
[build.environment]
  NODE_ENV = "production"
```

**Vercel:**

- Settings → Environment Variables
- Or use `.env.production.local` (for local testing only)

---

## Files Reference

| File                        | Purpose            | Platform |
| --------------------------- | ------------------ | -------- |
| `netlify.toml`              | Build config       | Netlify  |
| `netlify/functions/api.ts`  | Serverless handler | Netlify  |
| `vercel.json`               | Build config       | Vercel   |
| `api/index.ts`              | Serverless handler | Vercel   |
| `server/index.ts`           | Express app        | Both     |
| `server/routes/download.ts` | Download endpoint  | Both     |
| `client/lib/fileService.ts` | Frontend download  | Both     |

---

## Summary

✅ **Your backend is ready for deployment!**

- **Netlify**: Configured and ready to deploy
- **Vercel**: Configured and ready to deploy
- **CORS Download**: Works on both platforms via `/api/download`
- **Firebase Integration**: Compatible with both platforms

**Next Steps:**

1. Choose Netlify or Vercel
2. Connect your GitHub repository
3. Deploy with one click
4. Test downloads work without CORS errors

Happy deploying! 🚀
