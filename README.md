# Clinical Trials Analyzer Dashboard

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/pn4556/clinical-trials-dashboard)

A professional, interactive clinical trials dashboard for pharmaceutical investment analysis and healthcare decision-making.

## 🎯 Overview

This dashboard provides AI-powered analysis of clinical trials with investment signals, risk assessment, and comprehensive data visualization - designed specifically for healthcare and pharmaceutical professionals.

## ✨ Features

- **Interactive Data Visualization**: Charts showing confidence scores, phase distribution, and enrollment progress
- **Investment Signals**: Bull/Bear/Neutral indicators with confidence percentages
- **Field Toggles**: Show/hide different data sections (Basic Info, Enrollment, Financial, Scientific, Competitive, Scenarios, Metrics)
- **Advanced Filtering**: Filter by phase, signal type, and search across all fields
- **Real-time Metrics**: Market size, enrollment progress, key performance indicators
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🚀 Quick Start

### Deploy to Render (Recommended)
Click the "Deploy to Render" button above to instantly deploy your own instance.

### Local Development

```bash
# Clone the repository
git clone https://github.com/pn4556/clinical-trials-dashboard.git
cd clinical-trials-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
```

## 📊 Dashboard Sections

1. **Header Stats**: Quick overview of bullish/bearish signals, confidence scores, and market opportunity
2. **Search & Filters**: Find specific trials by drug name, company, indication, or trial ID
3. **Charts**: 
   - Confidence scores by trial
   - Phase distribution pie chart
4. **Field Toggles**: Customize which data fields are visible
5. **Trial Cards**: Expandable cards with comprehensive trial information:
   - Basic information (drug, company, indication)
   - Enrollment status with progress bars
   - Financial analysis and market size
   - Scientific mechanism and previous results
   - Competitive landscape and risk factors
   - Bull/Bear investment scenarios
   - Key performance metrics

## 🎨 Design

- **Color Scheme**: Professional medical aesthetic with blues, emeralds, and clean whites
- **Typography**: Clean, readable fonts optimized for data-heavy interfaces
- **Icons**: Lucide React icons for intuitive navigation
- **Animations**: Smooth transitions and hover effects

## 🏥 Use Cases

- **Investment Analysis**: Evaluate pharmaceutical investment opportunities
- **Research Planning**: Track competitor trials and market landscape
- **Business Development**: Identify partnership and acquisition targets
- **Clinical Operations**: Monitor enrollment and trial progress
- **Sales Presentations**: Professional dashboard for client meetings

## 🔧 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Output**: Static Export (dist folder)

## 📁 Project Structure

```
clinical-trials-dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main dashboard
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── lib/
│       └── utils.ts          # Utility functions
├── dist/                      # Build output
├── next.config.ts            # Next.js config
├── render.yaml               # Render deployment config
└── README.md
```

## 🌐 Custom Domain Setup

After deploying to Render:

1. **Add Custom Domain in Render**:
   - Go to Dashboard → Your Service → Settings → Custom Domains
   - Add: `clinicaltrials.complaicore.com`

2. **Configure Cloudflare DNS**:
   - Add CNAME record:
     - Name: `clinicaltrials`
     - Target: `[your-render-url].onrender.com`
     - Proxy: Enabled

3. **Wait for SSL**: Render will automatically provision SSL certificate

## 📝 Customization

### Adding More Trials

Edit `src/app/page.tsx` and add to the `MOCK_TRIALS` array:

```typescript
{
  id: 'NCTXXXXXXXX',
  title: 'Your Trial Title',
  drug: 'DRUG-001',
  company: 'Your Company',
  phase: 'Phase 2',
  // ... other fields
}
```

### Changing Colors

Edit color values in `src/app/globals.css`:

```css
:root {
  --primary: 201 96% 32%;  /* Change this */
  /* ... */
}
```

## 📄 License

MIT License - feel free to use for your own projects and presentations.

## 🤝 Support

For questions or customization requests:
- Email: PN@complaicore.com
- GitHub Issues: https://github.com/pn4556/clinical-trials-dashboard/issues

---

**Built with ❤️ for healthcare innovation**
