'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  FlaskConical,
  Users,
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Shield,
  Microscope,
  FileText,
  Clock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell } from 'recharts'
import { cn, formatNumber, formatCurrency, formatPercentage, getSignalColor, getPhaseColor } from '@/lib/utils'

// Mock data for clinical trials
const MOCK_TRIALS = [
  {
    id: 'NCT05187578',
    title: 'Novel CAR-T Therapy for Relapsed B-Cell Lymphoma',
    drug: 'CTX-451',
    company: 'Cytiva Therapeutics',
    phase: 'Phase 2',
    indication: 'B-Cell Lymphoma',
    enrollment: 142,
    targetEnrollment: 200,
    locations: 24,
    startDate: '2023-03-15',
    estimatedCompletion: '2025-08-30',
    primaryEndpoint: 'Overall Response Rate',
    signal: 'bull' as const,
    confidence: 87,
    marketSize: 2800000000,
    mechanism: 'CD19-targeted CAR-T',
    previousResults: 'Phase 1: 89% ORR, 67% CR',
    competitiveLandscape: 'Competitive but differentiated',
    investmentThesis: 'Best-in-class efficacy profile with manageable safety',
    riskFactors: 'Manufacturing complexity, competition from approved therapies',
    bullCase: 'Achieves 75%+ CR in Phase 2, fast track to approval, $1B+ peak sales',
    bearCase: 'Safety issues emerge, efficacy below 50%, program terminated',
    keyMetrics: {
      orr: 78,
      cr: 62,
      dlt: 8,
      dropout: 12
    }
  },
  {
    id: 'NCT04983272',
    title: 'Oral GLP-1 Agonist for Type 2 Diabetes',
    drug: 'GLP-5701',
    company: 'Metabolic Sciences Inc',
    phase: 'Phase 3',
    indication: 'Type 2 Diabetes',
    enrollment: 1847,
    targetEnrollment: 2000,
    locations: 156,
    startDate: '2022-11-01',
    estimatedCompletion: '2024-12-15',
    primaryEndpoint: 'HbA1c Reduction',
    signal: 'bull' as const,
    confidence: 92,
    marketSize: 15000000000,
    mechanism: 'Small molecule GLP-1 receptor agonist',
    previousResults: 'Phase 2: -1.8% HbA1c, 12% weight loss',
    competitiveLandscape: 'Large market, oral formulation advantage',
    investmentThesis: 'First oral GLP-1 with injectable-like efficacy',
    riskFactors: 'GI tolerability, cardiovascular outcomes trial required',
    bullCase: 'Non-inferior to Ozempic, $5B+ peak sales, oral convenience',
    bearCase: 'CV safety signal, modest efficacy vs injectables',
    keyMetrics: {
      hba1cChange: -1.9,
      weightLoss: 14,
      giEvents: 18,
      dropout: 8
    }
  },
  {
    id: 'NCT05042162',
    title: 'Gene Therapy for Duchenne Muscular Dystrophy',
    drug: 'GT-DMD-01',
    company: 'GenCure Biologics',
    phase: 'Phase 1/2',
    indication: 'Duchenne Muscular Dystrophy',
    enrollment: 18,
    targetEnrollment: 36,
    locations: 8,
    startDate: '2024-01-10',
    estimatedCompletion: '2026-06-30',
    primaryEndpoint: 'Micro-dystrophin Expression',
    signal: 'neutral' as const,
    confidence: 64,
    marketSize: 1200000000,
    mechanism: 'AAV-mediated micro-dystrophin delivery',
    previousResults: 'Preclinical: Robust expression, functional improvement',
    competitiveLandscape: 'Competitive, Sarepta and Pfizer ahead',
    investmentThesis: 'Novel capsid with better muscle tropism',
    riskFactors: 'Early stage, immunogenicity concerns, manufacturing',
    bullCase: 'Superior expression profile, partnership potential',
    bearCase: 'Immune responses limit redosing, efficacy unclear',
    keyMetrics: {
      expression: 45,
      functionalImprovement: 32,
      immuneResponse: 22,
      dropout: 0
    }
  },
  {
    id: 'NCT04872693',
    title: 'Anti-Tau Antibody for Alzheimer\'s Disease',
    drug: 'TAU-998',
    company: 'NeuroShine Pharma',
    phase: 'Phase 3',
    indication: 'Alzheimer\'s Disease',
    enrollment: 1563,
    targetEnrollment: 1800,
    locations: 203,
    startDate: '2021-09-20',
    estimatedCompletion: '2025-03-30',
    primaryEndpoint: 'CDR-SB Score Change',
    signal: 'bear' as const,
    confidence: 71,
    marketSize: 13000000000,
    mechanism: 'Humanized anti-tau monoclonal antibody',
    previousResults: 'Phase 2: Trend toward benefit, not significant',
    competitiveLandscape: 'Crowded, multiple tau antibodies failed',
    investmentThesis: 'Different epitope, earlier treatment initiation',
    riskFactors: 'Mechanism unproven, previous failures, long trial',
    bullCase: 'Modest benefit in early AD, $2B+ sales in niche',
    bearCase: 'Failed Phase 3, tau hypothesis questioned, program end',
    keyMetrics: {
      cdrSbChange: -0.3,
      amyloidReduction: 78,
      brainAtrophy: 2.1,
      dropout: 24
    }
  },
  {
    id: 'NCT05284714',
    title: 'KRAS G12C Inhibitor for Pancreatic Cancer',
    drug: 'KRA-2024',
    company: 'OncoTarget Therapeutics',
    phase: 'Phase 2',
    indication: 'Pancreatic Cancer',
    enrollment: 89,
    targetEnrollment: 120,
    locations: 42,
    startDate: '2023-08-05',
    estimatedCompletion: '2025-11-20',
    primaryEndpoint: 'Objective Response Rate',
    signal: 'bull' as const,
    confidence: 81,
    marketSize: 850000000,
    mechanism: 'Selective KRAS G12C inhibitor',
    previousResults: 'Phase 1: 42% ORR in CRC, manageable safety',
    competitiveLandscape: 'Mirati and Amgen approved in NSCLC',
    investmentThesis: 'Expansion into pancreatic, significant unmet need',
    riskFactors: 'Pancreatic cancer difficulty, limited efficacy duration',
    bullCase: '40%+ ORR in pancreatic, breakthrough designation',
    bearCase: '<20% ORR, rapid resistance, limited commercial potential',
    keyMetrics: {
      orr: 38,
      dcr: 72,
      medianPfs: 5.2,
      dropout: 15
    }
  },
  {
    id: 'NCT05129478',
    title: 'CRISPR-Based Sickle Cell Cure',
    drug: 'CRISPR-SC-001',
    company: 'EditGen Therapeutics',
    phase: 'Phase 1/2',
    indication: 'Sickle Cell Disease',
    enrollment: 24,
    targetEnrollment: 45,
    locations: 12,
    startDate: '2023-06-12',
    estimatedCompletion: '2026-09-15',
    primaryEndpoint: 'Fetal Hemoglobin Induction',
    signal: 'bull' as const,
    confidence: 89,
    marketSize: 2100000000,
    mechanism: 'CRISPR/Cas9 editing of BCL11A enhancer',
    previousResults: 'Early data: 100% HbF induction, pain crisis free',
    competitiveLandscape: 'Vertex ahead with Casgevy approval',
    investmentThesis: 'Simplified manufacturing, lower cost',
    riskFactors: 'Long-term safety unknown, manufacturing complexity',
    bullCase: 'Comparable to Casgevy, $1B+ opportunity, partnership',
    bearCase: 'Safety signal, efficacy below Casgevy, stranded asset',
    keyMetrics: {
      hbfInduction: 100,
      painCrisisFree: 100,
      transfusionIndependence: 92,
      dropout: 0
    }
  }
]

const FIELD_OPTIONS = [
  { id: 'basic', label: 'Basic Info', fields: ['id', 'title', 'drug', 'company', 'phase', 'indication'] },
  { id: 'enrollment', label: 'Enrollment', fields: ['enrollment', 'targetEnrollment', 'locations', 'startDate', 'estimatedCompletion'] },
  { id: 'financial', label: 'Financial', fields: ['marketSize', 'investmentThesis'] },
  { id: 'science', label: 'Scientific', fields: ['mechanism', 'previousResults', 'primaryEndpoint'] },
  { id: 'competitive', label: 'Competitive', fields: ['competitiveLandscape', 'riskFactors'] },
  { id: 'scenarios', label: 'Scenarios', fields: ['bullCase', 'bearCase'] },
  { id: 'metrics', label: 'Key Metrics', fields: ['keyMetrics'] },
]

export default function ClinicalTrialsDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPhase, setSelectedPhase] = useState<string>('all')
  const [selectedSignal, setSelectedSignal] = useState<string>('all')
  const [expandedTrial, setExpandedTrial] = useState<string | null>(null)
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({
    basic: true,
    enrollment: true,
    financial: true,
    science: false,
    competitive: false,
    scenarios: false,
    metrics: true,
  })

  const filteredTrials = useMemo(() => {
    return MOCK_TRIALS.filter(trial => {
      const matchesSearch = 
        trial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.drug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.indication.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesPhase = selectedPhase === 'all' || trial.phase.toLowerCase() === selectedPhase.toLowerCase()
      const matchesSignal = selectedSignal === 'all' || trial.signal === selectedSignal
      
      return matchesSearch && matchesPhase && matchesSignal
    })
  }, [searchQuery, selectedPhase, selectedSignal])

  const stats = useMemo(() => {
    const totalTrials = filteredTrials.length
    const bullCount = filteredTrials.filter(t => t.signal === 'bull').length
    const bearCount = filteredTrials.filter(t => t.signal === 'bear').length
    const neutralCount = filteredTrials.filter(t => t.signal === 'neutral').length
    const totalMarketSize = filteredTrials.reduce((sum, t) => sum + t.marketSize, 0)
    const avgConfidence = filteredTrials.length > 0 
      ? filteredTrials.reduce((sum, t) => sum + t.confidence, 0) / filteredTrials.length 
      : 0
    
    return { totalTrials, bullCount, bearCount, neutralCount, totalMarketSize, avgConfidence }
  }, [filteredTrials])

  const chartData = useMemo(() => {
    return filteredTrials.map(t => ({
      name: t.drug,
      confidence: t.confidence,
      marketSize: t.marketSize / 1000000000,
      enrollment: (t.enrollment / t.targetEnrollment) * 100,
      signal: t.signal
    }))
  }, [filteredTrials])

  const phaseDistribution = useMemo(() => {
    const phases: Record<string, number> = {}
    filteredTrials.forEach(t => {
      phases[t.phase] = (phases[t.phase] || 0) + 1
    })
    return Object.entries(phases).map(([name, value]) => ({ name, value }))
  }, [filteredTrials])

  const COLORS = ['#0066A1', '#0891B2', '#6366F1', '#8B5CF6', '#10B981', '#F59E0B']

  const toggleField = (fieldId: string) => {
    setVisibleFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-clinical flex items-center justify-center">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Clinical Trials Analyzer</h1>
                <p className="text-xs text-slate-500">Powered by AI • Real-time Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{stats.totalTrials} Trials</p>
                <p className="text-xs text-slate-500">{formatCurrency(stats.totalMarketSize)} TAM</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Bullish Signals</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.bullCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Bearish Signals</p>
                <p className="text-2xl font-bold text-red-600">{stats.bearCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Avg Confidence</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgConfidence.toFixed(0)}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Market Opportunity</p>
                <p className="text-2xl font-bold text-violet-600">{formatCurrency(stats.totalMarketSize)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-violet-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search trials, drugs, companies, indications..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
              >
                <option value="all">All Phases</option>
                <option value="phase 1">Phase 1</option>
                <option value="phase 1/2">Phase 1/2</option>
                <option value="phase 2">Phase 2</option>
                <option value="phase 3">Phase 3</option>
                <option value="phase 4">Phase 4</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSignal}
                onChange={(e) => setSelectedSignal(e.target.value)}
              >
                <option value="all">All Signals</option>
                <option value="bull">Bullish</option>
                <option value="bear">Bearish</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Confidence Score by Trial
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{fontSize: 10}} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="confidence" fill="#0066A1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-600" />
              Phase Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={phaseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {phaseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {phaseDistribution.map((phase, idx) => (
                <div key={phase.name} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded" style={{background: COLORS[idx % COLORS.length]}} />
                  <span className="text-slate-600">{phase.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Field Toggle Controls */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            Display Fields
          </h3>
          <div className="flex flex-wrap gap-2">
            {FIELD_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => toggleField(option.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5",
                  visibleFields[option.id]
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                )}
              >
                {visibleFields[option.id] ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trials List */}
        <div className="space-y-4">
          {filteredTrials.map((trial, idx) => (
            <div
              key={trial.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in"
              style={{animationDelay: `${idx * 50}ms`}}
            >
              {/* Header - Always Visible */}
              <div 
                className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedTrial(expandedTrial === trial.id ? null : trial.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-400">{trial.id}</span>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", getPhaseColor(trial.phase))}>
                        {trial.phase}
                      </span>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1", getSignalColor(trial.signal))}>
                        {trial.signal === 'bull' ? <TrendingUp className="w-3 h-3" /> : trial.signal === 'bear' ? <TrendingDown className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                        {trial.signal.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Target className="w-3 h-3" />
                        {trial.confidence}% confidence
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{trial.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <FlaskConical className="w-4 h-4 text-blue-500" />
                        {trial.drug}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-violet-500" />
                        {trial.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        {trial.indication}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">{formatCurrency(trial.marketSize)}</p>
                      <p className="text-xs text-slate-500">Market Size</p>
                    </div>
                    {expandedTrial === trial.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {expandedTrial === trial.id && (
                <div className="border-t border-slate-200 p-4 bg-slate-50/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic & Enrollment Info */}
                    {(visibleFields.basic || visibleFields.enrollment) && (
                      <div className="space-y-4">
                        {visibleFields.enrollment && (
                          <div className="bg-white rounded-lg p-4 border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <Users className="w-4 h-4 text-blue-600" />
                              Enrollment Status
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-slate-600">Progress</span>
                                  <span className="font-medium">{Math.round((trial.enrollment / trial.targetEnrollment) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full transition-all"
                                    style={{width: `${(trial.enrollment / trial.targetEnrollment) * 100}%`}}
                                  />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                  {trial.enrollment} of {trial.targetEnrollment} patients enrolled
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Sites</p>
                                  <p className="font-medium">{trial.locations} locations</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Primary Endpoint</p>
                                  <p className="font-medium">{trial.primaryEndpoint}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Started</p>
                                  <p className="font-medium">{trial.startDate}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Est. Completion</p>
                                  <p className="font-medium">{trial.estimatedCompletion}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {visibleFields.financial && (
                          <div className="bg-white rounded-lg p-4 border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-emerald-600" />
                              Investment Thesis
                            </h4>
                            <p className="text-sm text-slate-700">{trial.investmentThesis}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Scientific & Competitive */}
                    {(visibleFields.science || visibleFields.competitive) && (
                      <div className="space-y-4">
                        {visibleFields.science && (
                          <div className="bg-white rounded-lg p-4 border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <Microscope className="w-4 h-4 text-violet-600" />
                              Scientific Overview
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-slate-500">Mechanism: </span>
                                <span className="text-slate-900">{trial.mechanism}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Previous Results: </span>
                                <span className="text-slate-900">{trial.previousResults}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {visibleFields.competitive && (
                          <div className="bg-white rounded-lg p-4 border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4 text-amber-600" />
                              Competitive & Risk Analysis
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-slate-500">Landscape: </span>
                                <span className="text-slate-900">{trial.competitiveLandscape}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Risk Factors: </span>
                                <span className="text-red-600">{trial.riskFactors}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bull/Bear Cases */}
                  {visibleFields.scenarios && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                        <h4 className="text-sm font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Bull Case
                        </h4>
                        <p className="text-sm text-emerald-800">{trial.bullCase}</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <h4 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-2">
                          <TrendingDown className="w-4 h-4" />
                          Bear Case
                        </h4>
                        <p className="text-sm text-red-800">{trial.bearCase}</p>
                      </div>
                    </div>
                  )}

                  {/* Key Metrics */}
                  {visibleFields.metrics && trial.keyMetrics && (
                    <div className="mt-4 bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        Key Performance Metrics
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(trial.keyMetrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
                            <p className="text-xl font-bold text-blue-600">
                              {typeof value === 'number' ? value.toFixed(0) : value}
                              {key.toLowerCase().includes('rate') || key.toLowerCase().includes('orr') || key.toLowerCase().includes('cr') ? '%' : ''}
                            </p>
                            <p className="text-xs text-slate-500 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTrials.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No trials found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}
