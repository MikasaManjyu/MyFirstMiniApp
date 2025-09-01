# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Option 2: Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variables in Netlify settings

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Build and deploy: `npm run build && npm run deploy`

## Environment Variables for Production

Make sure to set these in your deployment platform:

```
VITE_BASE_DEVELOPER_API_KEY=your_actual_api_key
VITE_WALLETCONNECT_PROJECT_ID=your_actual_project_id
```

## Build Command
```bash
npm run build
```

## Output Directory
```
dist/
```

## Node Version
```
18.x or higher
```