# Deploy to Render

## Option 1: Deploy via Blueprint

1. Go to: https://dashboard.render.com/blueprints
2. Click "New Blueprint Instance"
3. Connect your GitHub repository: `pn4556/clinical-trials-dashboard`
4. Render will automatically detect the `render.yaml` configuration
5. Click "Apply" to deploy

## Option 2: Manual Deploy

1. Go to: https://dashboard.render.com/select-repo?type=static
2. Connect GitHub and select `clinical-trials-dashboard`
3. Configure:
   - **Name**: clinical-trials-dashboard
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Click "Create Static Site"

## After Deployment

Once deployed, configure custom domain:
1. Go to dashboard.render.com
2. Select your service
3. Click "Settings" → "Custom Domain"
4. Add: `clinicaltrials.complaicore.com`

## Cloudflare DNS

Add CNAME record:
- **Name**: clinicaltrials
- **Target**: [your-render-url].onrender.com
- **Proxy**: Enabled (orange cloud)

## Local Development

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

## Features

- Interactive clinical trials dashboard
- Real-time filtering and search
- Bull/Bear/Neutral investment signals
- Toggle fields on/off
- Responsive design
- Professional medical aesthetic

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React
