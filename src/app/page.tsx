'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  Building2, 
  FlaskConical,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Globe,
  Pill,
  Microscope,
  Clock,
  ChevronDown,
  ChevronUp,
  BarChart3,
  PieChart,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Beaker,
  HeartPulse,
  Brain,
  Dna,
  Sparkles,
  Stethoscope
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { cn, formatNumber, formatCurrency, formatPercentage } from '@/lib/utils'

// TOP 30 PHARMA COMPANIES
const PHARMA_COMPANIES = [
  {
    id: 'P001',
    name: 'Johnson & Johnson',
    ticker: 'JNJ',
    marketCap: 377000000000,
    revenue: 85200000000,
    employees: 131000,
    headquarters: 'New Brunswick, NJ',
    therapeuticAreas: ['Oncology', 'Immunology', 'Neuroscience', 'Infectious Disease'],
    pipelineCount: 45,
    phase1: 12,
    phase2: 18,
    phase3: 10,
    regulatory: 5,
    topDrugs: ['Darzalex', 'Stelara', 'Imbruvica', 'Tremfya'],
    upcomingTrials: ['NCT05259709', 'NCT05138487'],
    website: 'jnj.com',
    founded: 1886,
    rdSpend: 15100000000
  },
  {
    id: 'P002',
    name: 'Eli Lilly',
    ticker: 'LLY',
    marketCap: 732000000000,
    revenue: 34100000000,
    employees: 43000,
    headquarters: 'Indianapolis, IN',
    therapeuticAreas: ['Diabetes', 'Oncology', 'Immunology', 'Neuroscience'],
    pipelineCount: 52,
    phase1: 15,
    phase2: 22,
    phase3: 12,
    regulatory: 3,
    topDrugs: ['Mounjaro', 'Zepbound', 'Verzenio', 'Taltz'],
    upcomingTrials: ['NCT05624220', 'NCT05567796'],
    website: 'lilly.com',
    founded: 1876,
    rdSpend: 9300000000
  },
  {
    id: 'P003',
    name: 'Novo Nordisk',
    ticker: 'NVO',
    marketCap: 456000000000,
    revenue: 33700000000,
    employees: 63000,
    headquarters: 'Bagsværd, Denmark',
    therapeuticAreas: ['Diabetes', 'Obesity', 'Rare Disease', 'Hemophilia'],
    pipelineCount: 38,
    phase1: 10,
    phase2: 16,
    phase3: 9,
    regulatory: 3,
    topDrugs: ['Ozempic', 'Wegovy', 'Rybelsus', 'NovoSeven'],
    upcomingTrials: ['NCT05646706', 'NCT05556511'],
    website: 'novonordisk.com',
    founded: 1923,
    rdSpend: 4500000000
  },
  {
    id: 'P004',
    name: 'Pfizer',
    ticker: 'PFE',
    marketCap: 162000000000,
    revenue: 58500000000,
    employees: 88000,
    headquarters: 'New York, NY',
    therapeuticAreas: ['Oncology', 'Vaccines', 'Internal Medicine', 'Inflammation'],
    pipelineCount: 68,
    phase1: 20,
    phase2: 28,
    phase3: 15,
    regulatory: 5,
    topDrugs: ['Comirnaty', 'Paxlovid', 'Eliquis', 'Prevnar'],
    upcomingTrials: ['NCT05375887', 'NCT05226507'],
    website: 'pfizer.com',
    founded: 1849,
    rdSpend: 10700000000
  },
  {
    id: 'P005',
    name: 'Roche',
    ticker: 'RHHBY',
    marketCap: 208000000000,
    revenue: 60400000000,
    employees: 103000,
    headquarters: 'Basel, Switzerland',
    therapeuticAreas: ['Oncology', 'Neuroscience', 'Immunology', 'Ophthalmology'],
    pipelineCount: 82,
    phase1: 25,
    phase2: 32,
    phase3: 18,
    regulatory: 7,
    topDrugs: ['Ocrevus', 'Perjeta', 'Tecentriq', 'Hemlibra'],
    upcomingTrials: ['NCT05565765', 'NCT05419430'],
    website: 'roche.com',
    founded: 1896,
    rdSpend: 16000000000
  },
  {
    id: 'P006',
    name: 'Merck',
    ticker: 'MRK',
    marketCap: 321000000000,
    revenue: 60100000000,
    employees: 72000,
    headquarters: 'Rahway, NJ',
    therapeuticAreas: ['Oncology', 'Vaccines', 'Infectious Disease', 'Cardiovascular'],
    pipelineCount: 58,
    phase1: 18,
    phase2: 24,
    phase3: 12,
    regulatory: 4,
    topDrugs: ['Keytruda', 'Gardasil', 'Lagevrio', 'Januvia'],
    upcomingTrials: ['NCT05633654', 'NCT05514342'],
    website: 'merck.com',
    founded: 1891,
    rdSpend: 13500000000
  },
  {
    id: 'P007',
    name: 'AbbVie',
    ticker: 'ABBV',
    marketCap: 298000000000,
    revenue: 54300000000,
    employees: 50000,
    headquarters: 'North Chicago, IL',
    therapeuticAreas: ['Immunology', 'Oncology', 'Neuroscience', 'Eye Care'],
    pipelineCount: 48,
    phase1: 14,
    phase2: 20,
    phase3: 10,
    regulatory: 4,
    topDrugs: ['Humira', 'Skyrizi', 'Rinvoq', 'Venclexta'],
    upcomingTrials: ['NCT05630630', 'NCT05548615'],
    website: 'abbvie.com',
    founded: 2013,
    rdSpend: 7700000000
  },
  {
    id: 'P008',
    name: 'Novartis',
    ticker: 'NVS',
    marketCap: 212000000000,
    revenue: 45400000000,
    employees: 76000,
    headquarters: 'Basel, Switzerland',
    therapeuticAreas: ['Oncology', 'Cardiovascular', 'Immunology', 'Neuroscience'],
    pipelineCount: 72,
    phase1: 22,
    phase2: 30,
    phase3: 15,
    regulatory: 5,
    topDrugs: ['Entresto', 'Cosentyx', 'Kesimpta', 'Pluvicto'],
    upcomingTrials: ['NCT05606507', 'NCT05538006'],
    website: 'novartis.com',
    founded: 1996,
    rdSpend: 9000000000
  },
  {
    id: 'P009',
    name: 'AstraZeneca',
    ticker: 'AZN',
    marketCap: 231000000000,
    revenue: 45800000000,
    employees: 83000,
    headquarters: 'Cambridge, UK',
    therapeuticAreas: ['Oncology', 'Cardiovascular', 'Respiratory', 'Rare Disease'],
    pipelineCount: 175,
    phase1: 55,
    phase2: 72,
    phase3: 35,
    regulatory: 13,
    topDrugs: ['Tagrisso', 'Farxiga', 'Imfinzi', 'Enhertu'],
    upcomingTrials: ['NCT05633158', 'NCT05568531'],
    website: 'astrazeneca.com',
    founded: 1999,
    rdSpend: 10900000000
  },
  {
    id: 'P010',
    name: 'Bristol Myers Squibb',
    ticker: 'BMY',
    marketCap: 92000000000,
    revenue: 45000000000,
    employees: 34000,
    headquarters: 'New York, NY',
    therapeuticAreas: ['Oncology', 'Immunology', 'Cardiovascular', 'Neuroscience'],
    pipelineCount: 52,
    phase1: 16,
    phase2: 22,
    phase3: 10,
    regulatory: 4,
    topDrugs: ['Opdivo', 'Eliquis', 'Orencia', 'Pomalyst'],
    upcomingTrials: ['NCT05643830', 'NCT05548618'],
    website: 'bms.com',
    founded: 1887,
    rdSpend: 11200000000
  },
  {
    id: 'P011',
    name: 'Sanofi',
    ticker: 'SNY',
    marketCap: 118000000000,
    revenue: 47100000000,
    employees: 82000,
    headquarters: 'Paris, France',
    therapeuticAreas: ['Immunology', 'Rare Disease', 'Oncology', 'Vaccines'],
    pipelineCount: 65,
    phase1: 20,
    phase2: 26,
    phase3: 14,
    regulatory: 5,
    topDrugs: ['Dupixent', 'Lantus', 'Aubagio', 'Jevtana'],
    upcomingTrials: ['NCT05581462', 'NCT05486791'],
    website: 'sanofi.com',
    founded: 1973,
    rdSpend: 7200000000
  },
  {
    id: 'P012',
    name: 'GSK',
    ticker: 'GSK',
    marketCap: 84000000000,
    revenue: 36600000000,
    employees: 70000,
    headquarters: 'London, UK',
    therapeuticAreas: ['Vaccines', 'Infectious Disease', 'Oncology', 'Respiratory'],
    pipelineCount: 55,
    phase1: 17,
    phase2: 23,
    phase3: 11,
    regulatory: 4,
    topDrugs: ['Shingrix', 'Biktarvy', 'Trelegy', 'Nucala'],
    upcomingTrials: ['NCT05574241', 'NCT05423835'],
    website: 'gsk.com',
    founded: 2000,
    rdSpend: 7000000000
  },
  {
    id: 'P013',
    name: 'Takeda',
    ticker: 'TAK',
    marketCap: 47000000000,
    revenue: 31500000000,
    employees: 50000,
    headquarters: 'Tokyo, Japan',
    therapeuticAreas: ['Gastroenterology', 'Oncology', 'Rare Disease', 'Neuroscience'],
    pipelineCount: 42,
    phase1: 12,
    phase2: 18,
    phase3: 9,
    regulatory: 3,
    topDrugs: ['Entyvio', 'Vyvanse', 'Ninlaro', 'Adcetris'],
    upcomingTrials: ['NCT05568030', 'NCT05420148'],
    website: 'takeda.com',
    founded: 1781,
    rdSpend: 5000000000
  },
  {
    id: 'P014',
    name: 'Bayer',
    ticker: 'BAYRY',
    marketCap: 35000000000,
    revenue: 51000000000,
    employees: 101000,
    headquarters: 'Leverkusen, Germany',
    therapeuticAreas: ['Cardiovascular', 'Oncology', 'Radiology', 'Women\'s Health'],
    pipelineCount: 38,
    phase1: 11,
    phase2: 16,
    phase3: 8,
    regulatory: 3,
    topDrugs: ['Xarelto', 'Eylea', 'Nubeqa', 'Kerendia'],
    upcomingTrials: ['NCT05538682', 'NCT05429168'],
    website: 'bayer.com',
    founded: 1863,
    rdSpend: 7500000000
  },
  {
    id: 'P015',
    name: 'Amgen',
    ticker: 'AMGN',
    marketCap: 155000000000,
    revenue: 28100000000,
    employees: 26000,
    headquarters: 'Thousand Oaks, CA',
    therapeuticAreas: ['Oncology', 'Cardiovascular', 'Inflammation', 'Bone Health'],
    pipelineCount: 35,
    phase1: 10,
    phase2: 15,
    phase3: 8,
    regulatory: 2,
    topDrugs: ['Prolia', 'Repatha', 'Otezla', 'Tezspire'],
    upcomingTrials: ['NCT05565827', 'NCT05487038'],
    website: 'amgen.com',
    founded: 1980,
    rdSpend: 4800000000
  },
  {
    id: 'P016',
    name: 'Boehringer Ingelheim',
    ticker: 'Private',
    marketCap: 0,
    revenue: 25000000000,
    employees: 53000,
    headquarters: 'Ingelheim, Germany',
    therapeuticAreas: ['Respiratory', 'Cardiometabolic', 'Oncology', 'Immunology'],
    pipelineCount: 48,
    phase1: 15,
    phase2: 20,
    phase3: 10,
    regulatory: 3,
    topDrugs: ['Jardiance', 'Spiriva', 'Ofev', 'Pradaxa'],
    upcomingTrials: ['NCT05586530', 'NCT05423891'],
    website: 'boehringer-ingelheim.com',
    founded: 1885,
    rdSpend: 4700000000
  },
  {
    id: 'P017',
    name: 'Moderna',
    ticker: 'MRNA',
    marketCap: 45000000000,
    revenue: 6800000000,
    employees: 5600,
    headquarters: 'Cambridge, MA',
    therapeuticAreas: ['Vaccines', 'Cancer Vaccines', 'Rare Disease', 'Autoimmune'],
    pipelineCount: 45,
    phase1: 20,
    phase2: 18,
    phase3: 6,
    regulatory: 1,
    topDrugs: ['Spikevax', 'mRNA-1345', 'mRNA-4157'],
    upcomingTrials: ['NCT05585693', 'NCT05432583'],
    website: 'modernatx.com',
    founded: 2010,
    rdSpend: 3600000000
  },
  {
    id: 'P018',
    name: 'Gilead Sciences',
    ticker: 'GILD',
    marketCap: 98000000000,
    revenue: 27100000000,
    employees: 18000,
    headquarters: 'Foster City, CA',
    therapeuticAreas: ['Virology', 'Oncology', 'Inflammation'],
    pipelineCount: 38,
    phase1: 12,
    phase2: 16,
    phase3: 8,
    regulatory: 2,
    topDrugs: ['Biktarvy', 'Descovy', 'Yescarta', 'Trodelvy'],
    upcomingTrials: ['NCT05565830', 'NCT05423895'],
    website: 'gilead.com',
    founded: 1987,
    rdSpend: 5500000000
  },
  {
    id: 'P019',
    name: 'Vertex Pharmaceuticals',
    ticker: 'VRTX',
    marketCap: 115000000000,
    revenue: 9900000000,
    employees: 5000,
    headquarters: 'Boston, MA',
    therapeuticAreas: ['Cystic Fibrosis', 'Sickle Cell', 'Pain', 'Diabetes'],
    pipelineCount: 22,
    phase1: 8,
    phase2: 10,
    phase3: 3,
    regulatory: 1,
    topDrugs: ['Trikafta', 'Casgevy', 'VX-548'],
    upcomingTrials: ['NCT05565832', 'NCT05423902'],
    website: 'vrtx.com',
    founded: 1989,
    rdSpend: 2800000000
  },
  {
    id: 'P020',
    name: 'Regeneron',
    ticker: 'REGN',
    marketCap: 108000000000,
    revenue: 13100000000,
    employees: 11500,
    headquarters: 'Tarrytown, NY',
    therapeuticAreas: ['Ophthalmology', 'Immunology', 'Oncology', 'Cardiovascular'],
    pipelineCount: 32,
    phase1: 10,
    phase2: 14,
    phase3: 7,
    regulatory: 1,
    topDrugs: ['Eylea', 'Dupixent', 'Libtayo', 'Praluent'],
    upcomingTrials: ['NCT05565835', 'NCT05423908'],
    website: 'regeneron.com',
    founded: 1988,
    rdSpend: 4100000000
  },
  {
    id: 'P021',
    name: 'Biogen',
    ticker: 'BIIB',
    marketCap: 31000000000,
    revenue: 9500000000,
    employees: 8700,
    headquarters: 'Cambridge, MA',
    therapeuticAreas: ['Neuroscience', 'Rare Disease', 'Multiple Sclerosis'],
    pipelineCount: 28,
    phase1: 9,
    phase2: 12,
    phase3: 5,
    regulatory: 2,
    topDrugs: ['Tecfidera', 'Spinraza', 'Leqembi', 'Vumerity'],
    upcomingTrials: ['NCT05565838', 'NCT05423915'],
    website: 'biogen.com',
    founded: 1978,
    rdSpend: 2300000000
  },
  {
    id: 'P022',
    name: 'BioNTech',
    ticker: 'BNTX',
    marketCap: 28000000000,
    revenue: 3800000000,
    employees: 4300,
    headquarters: 'Mainz, Germany',
    therapeuticAreas: ['Cancer Vaccines', 'Infectious Disease', 'Autoimmune'],
    pipelineCount: 35,
    phase1: 15,
    phase2: 14,
    phase3: 5,
    regulatory: 1,
    topDrugs: ['Comirnaty', 'BNT122', 'BNT111'],
    upcomingTrials: ['NCT05565841', 'NCT05423922'],
    website: 'biontech.de',
    founded: 2008,
    rdSpend: 1800000000
  },
  {
    id: 'P023',
    name: 'Illumina',
    ticker: 'ILMN',
    marketCap: 22000000000,
    revenue: 4500000000,
    employees: 9800,
    headquarters: 'San Diego, CA',
    therapeuticAreas: ['Genomics', 'Diagnostics', 'Oncology Screening'],
    pipelineCount: 15,
    phase1: 0,
    phase2: 0,
    phase3: 0,
    regulatory: 0,
    topDrugs: ['NovaSeq', 'NextSeq', 'Grail Galleri'],
    upcomingTrials: [],
    website: 'illumina.com',
    founded: 1998,
    rdSpend: 1200000000
  },
  {
    id: 'P024',
    name: 'Danaher',
    ticker: 'DHR',
    marketCap: 168000000000,
    revenue: 23900000000,
    employees: 63000,
    headquarters: 'Washington, DC',
    therapeuticAreas: ['Diagnostics', 'Life Sciences', 'Bioprocessing'],
    pipelineCount: 0,
    phase1: 0,
    phase2: 0,
    phase3: 0,
    regulatory: 0,
    topDrugs: ['Beckman Coulter', 'Cepheid', 'Pall'],
    upcomingTrials: [],
    website: 'danaher.com',
    founded: 1969,
    rdSpend: 1800000000
  },
  {
    id: 'P025',
    name: 'Thermo Fisher Scientific',
    ticker: 'TMO',
    marketCap: 212000000000,
    revenue: 42800000000,
    employees: 122000,
    headquarters: 'Waltham, MA',
    therapeuticAreas: ['Life Sciences', 'Diagnostics', 'Analytical Instruments'],
    pipelineCount: 0,
    phase1: 0,
    phase2: 0,
    phase3: 0,
    regulatory: 0,
    topDrugs: ['Applied Biosystems', 'Invitrogen', 'Patheon'],
    upcomingTrials: [],
    website: 'thermofisher.com',
    founded: 2006,
    rdSpend: 1400000000
  },
  {
    id: 'P026',
    name: 'Merck KGaA',
    ticker: 'MKKGY',
    marketCap: 52000000000,
    revenue: 22000000000,
    employees: 64000,
    headquarters: 'Darmstadt, Germany',
    therapeuticAreas: ['Oncology', 'Neurology', 'Immunology', 'Fertility'],
    pipelineCount: 30,
    phase1: 9,
    phase2: 13,
    phase3: 6,
    regulatory: 2,
    topDrugs: ['Erbitux', 'Mavenclad', 'Bavencio'],
    upcomingTrials: ['NCT05565844', 'NCT05423928'],
    website: 'merckgroup.com',
    founded: 1668,
    rdSpend: 2800000000
  },
  {
    id: 'P027',
    name: 'Horizon Therapeutics',
    ticker: 'HZNP',
    marketCap: 24000000000,
    revenue: 3600000000,
    employees: 1700,
    headquarters: 'Dublin, Ireland',
    therapeuticAreas: ['Rare Disease', 'Inflammation', 'Gout'],
    pipelineCount: 18,
    phase1: 5,
    phase2: 8,
    phase3: 4,
    regulatory: 1,
    topDrugs: ['Tepezza', 'Krystexxa', 'Uplizna'],
    upcomingTrials: ['NCT05565847', 'NCT05423935'],
    website: 'horizontherapeutics.com',
    founded: 2005,
    rdSpend: 650000000
  },
  {
    id: 'P028',
    name: 'Jazz Pharmaceuticals',
    ticker: 'JAZZ',
    marketCap: 9200000000,
    revenue: 3700000000,
    employees: 2900,
    headquarters: 'Dublin, Ireland',
    therapeuticAreas: ['Neuroscience', 'Oncology', 'Epilepsy'],
    pipelineCount: 20,
    phase1: 6,
    phase2: 9,
    phase3: 4,
    regulatory: 1,
    topDrugs: ['Xywav', 'Epidiolex', 'Rylaze', 'Zepzelca'],
    upcomingTrials: ['NCT05565850', 'NCT05423942'],
    website: 'jazzpharma.com',
    founded: 2003,
    rdSpend: 580000000
  },
  {
    id: 'P029',
    name: 'Alexion Pharmaceuticals',
    ticker: 'ALXN',
    marketCap: 42000000000,
    revenue: 7300000000,
    employees: 3800,
    headquarters: 'Boston, MA',
    therapeuticAreas: ['Rare Disease', 'Immunology', 'Hematology'],
    pipelineCount: 25,
    phase1: 8,
    phase2: 11,
    phase3: 5,
    regulatory: 1,
    topDrugs: ['Soliris', 'Ultomiris', 'Strensiq', 'Kanuma'],
    upcomingTrials: ['NCT05565853', 'NCT05423948'],
    website: 'alexion.com',
    founded: 1992,
    rdSpend: 1100000000
  },
  {
    id: 'P030',
    name: 'Seagen',
    ticker: 'SGEN',
    marketCap: 43000000000,
    revenue: 2400000000,
    employees: 2800,
    headquarters: 'Bothell, WA',
    therapeuticAreas: ['Oncology', 'Antibody-Drug Conjugates'],
    pipelineCount: 22,
    phase1: 7,
    phase2: 10,
    phase3: 4,
    regulatory: 1,
    topDrugs: ['Adcetris', 'Padcev', 'Tukysa', 'Tivdak'],
    upcomingTrials: ['NCT05565856', 'NCT05423955'],
    website: 'seagen.com',
    founded: 1997,
    rdSpend: 850000000
  }
]

// TOP 20 BIOTECH COMPANIES
const BIOTECH_COMPANIES = [
  {
    id: 'B001',
    name: 'CRISPR Therapeutics',
    ticker: 'CRSP',
    marketCap: 5800000000,
    revenue: 900000000,
    employees: 480,
    headquarters: 'Zug, Switzerland',
    therapeuticAreas: ['Gene Editing', 'Hematology', 'Immunology', 'Diabetes'],
    pipelineCount: 12,
    phase1: 5,
    phase2: 5,
    phase3: 2,
    regulatory: 0,
    topDrugs: ['Casgevy', 'CTX-130', 'CTX-110'],
    upcomingTrials: ['NCT05575159', 'NCT05467472'],
    website: 'crisprtx.com',
    founded: 2013,
    rdSpend: 450000000
  },
  {
    id: 'B002',
    name: 'Intellia Therapeutics',
    ticker: 'NTLA',
    marketCap: 4200000000,
    revenue: 120000000,
    employees: 520,
    headquarters: 'Cambridge, MA',
    therapeuticAreas: ['Gene Editing', 'Cardiovascular', 'Immunology'],
    pipelineCount: 10,
    phase1: 4,
    phase2: 4,
    phase3: 2,
    regulatory: 0,
    topDrugs: ['NTLA-2001', 'NTLA-2002', 'NTLA-2003'],
    upcomingTrials: ['NCT05447608', 'NCT05345103'],
    website: 'intelliatx.com',
    founded: 2014,
    rdSpend: 380000000
  },
  {
    id: 'B003',
    name: 'Editas Medicine',
    ticker: 'EDIT',
    marketCap: 850000000,
    revenue: 45000000,
    employees: 280,
    headquarters: 'Cambridge, MA',
    therapeuticAreas: ['Gene Editing', 'Ophthalmology', 'Immunology'],
    pipelineCount: 8,
    phase1: 4,
    phase2: 3,
    phase3: 1,
    regulatory: 0,
    topDrugs: ['EDIT-101', 'EDIT-301'],
    upcomingTrials: ['NCT05579922', 'NCT05396378'],
    website: 'editasmedicine.com',
    founded: 2013,
    rdSpend: 220000000
  },
  {
    id: 'B004',
    name: 'Beam Therapeutics',
    ticker: 'BEAM',
    marketCap: 2100000000,
    revenue: 80000000,
    employees: 380,
    headquarters: 'Cambridge, MA',
    therapeuticAreas: ['Base Editing', 'Hematology', 'Liver Disease', 'CNS'],
    pipelineCount: 9,
    phase1: 5,
    phase2: 3,
    phase3: 1,
    regulatory: 0,
    topDrugs: ['BEAM-101', 'BEAM-201', 'BEAM-302'],
    upcomingTrials: ['NCT05607649', 'NCT05487849'],
    website: 'beamtx.com',
    founded: 2017,
    rdSpend: 280000000
  },
  {
    id: 'B005',
    name: 'Alnylam Pharmaceuticals',
    ticker: 'ALNY',
    marketCap: 28000000000,
    revenue: 890000000,
    employees: 1850,
    headquarters: 'Cambridge, MA',
    therapeuticAreas: ['RNAi', 'Cardiovascular', 'Neurology', 'Infectious Disease'],
    pipelineCount: 18,
    phase1: 6,
    phase2: 8,
    phase3: 4,
    regulatory: 0,
    topDrugs: ['Onpattro', 'Givlaari', 'Oxlumo', 'Amvuttra'],
    upcomingTrials: ['NCT05569358', 'NCT05438625'],
    website: 'alnylam.com',
    founded: 2002,
    rdSpend: 750000000
  },
  {
    id: 'B006',
    name: 'Arrowhead Pharmaceuticals',
    ticker: 'ARWR',
    marketCap: 6500000000,
    revenue: 150000000,
    employees: 520,
    headquarters: 'Pasadena, CA',
    therapeuticAreas: ['RNAi', 'Cardiovascular', 'Liver Disease', 'Pulmonary'],
    pipelineCount: 16,
    phase1: 7,
    phase2: 6,
    phase3: 3,
    regulatory: 0,
    topDrugs: ['ARO-APOC3', 'ARO-ANG3', 'ARO-HSD'],
    upcomingTrials: ['NCT05650158', 'NCT05489198'],
    website: 'arrowheadpharma.com',
    founded: 1989,
    rdSpend: 320000000
  },
  {
    id: 'B007',
    name: 'Ionis Pharmaceuticals',
    ticker: 'IONS',
    marketCap: 8200000000,
    revenue: 587000000,
    employees: 750,
    headquarters: 'Carlsbad, CA',
    therapeuticAreas: ['Antisense', 'Neurology', 'Cardiovascular', 'Oncology'],
    pipelineCount: 35,
    phase1: 15,
    phase2: 12,
    phase3: 7,
    regulatory: 1,
    topDrugs: ['Spinraza', 'Tegsedi', 'Waylivra', 'Qalsody'],
    upcomingTrials: ['NCT05571786', 'NCT05423849'],
    website: 'ionispharma.com',
    founded: 1989,
    rdSpend: 520000000
  },
  {
    id: 'B008',
    name: 'Sarepta Therapeutics',
    ticker: 'SRPT',
    marketCap: 12500000000,
    revenue: 930000000,
    employees: 1200,
    headquarters: 'Cambridge, MA',
    therapeuticAreas: ['Gene Therapy', 'Duchenne MD', 'Limb-Girdle MD'],
    pipelineCount: 14,
    phase1: 5,
    phase2: 6,
    phase3: 3,
    regulatory: 0,
    topDrugs: ['Exondys 51', 'Vyondys 53', 'Amondys 45', 'Elevidys'],
    upcomingTrials: ['NCT05569458', 'NCT05489515'],
    website: 'sarepta.com',
    founded: 1980,
    rdSpend: 580000000
  },
  {
    id: 'B009',
    name: 'Bluebird Bio',
    ticker: 'BLUE',
    marketCap: 450000000,
    revenue: 28000000,
    employees: 520,
    headquarters: 'Somerville, MA',
    therapeuticAreas: ['Gene Therapy', 'Sickle Cell', 'Multiple Myeloma', 'Cerebral ALD'],
    pipelineCount: 8,
    phase1: 3,
    phase2: 3,
    phase3: 2,
    regulatory: 0,
    topDrugs: ['Zynteglo', 'Skysona', 'Abecma'],
    upcomingTrials: ['NCT05569489', 'NCT05489622'],
    website: 'bluebirdbio.com',
    founded: 1992,
    rdSpend: 380000000
  },
  {
    id: 'B010',
    name: 'uniQure',
    ticker: 'QURE',
    marketCap: 890000000,
    revenue: 45000000,
    employees: 280,
    headquarters: 'Amsterdam, Netherlands',
    therapeuticAreas: ['Gene Therapy', 'Hemophilia', 'Huntington\'s Disease', 'ALS'],
    pipelineCount: 6,
    phase1: 2,
    phase2: 3,
    phase3: 1,
    regulatory: 0,
    topDrugs: ['Hemgenix', 'AMT-130'],
    upcomingTrials: ['NCT05569521', 'NCT05489735'],
    website: 'uniqure.com',
    founded: 1998,
    rdSpend: 180000000
  },
  {
    id: 'B011',
    name: 'BioMarin Pharmaceutical',
    ticker: 'BMRN',
    marketCap: 17500000000,
    revenue: 2100000000,
    employees: 3200,
    headquarters: 'San Rafael, CA',
    therapeuticAreas: ['Rare Disease', 'Enzyme Replacement', 'Gene Therapy'],
    pipelineCount: 22,
    phase1: 8,
    phase2: 9,
    phase3: 5,
    regulatory: 0,
    topDrugs: ['Vimizim', 'Naglazyme', 'Aldurazyme', 'Roctavian'],
    upcomingTrials: ['NCT05569552', 'NCT05489848'],
    website: 'biomarin.com',
    founded: 1997,
    rdSpend: 850000000
  },
  {
    id: 'B012',
    name: 'Ultragenyx',
    ticker: 'RARE',
    marketCap: 4200000000,
    revenue: 380000000,
    employees: 850,
    headquarters: 'Novato, CA',
    therapeuticAreas: ['Rare Disease', 'Genetic Disorders', 'Metabolic Disease'],
    pipelineCount: 15,
    phase1: 6,
    phase2: 6,
    phase3: 3,
    regulatory: 0,
    topDrugs: ['Crysvita', 'Mepsevii', 'Dojolvi', 'Evkeeza'],
    upcomingTrials: ['NCT05569583', 'NCT05489961'],
    website: 'ultragenyx.com',
    founded: 2010,
    rdSpend: 380000000
  },
  {
    id: 'B013',
    name: 'Sage Therapeutics',
    ticker: 'SAGE',
    marketCap: 1400000000,
    revenue: 62000000,
    employees: 620,
    headquarters: 'Cambridge, MA',
    therapeuticAreas: ['Neuroscience', 'Depression', 'Huntington\'s Disease'],
    pipelineCount: 8,
    phase1: 3,
    phase2: 3,
    phase3: 2,
    regulatory: 0,
    topDrugs: ['Zulresso', 'Zuranolone'],
    upcomingTrials: ['NCT05569614', 'NCT05490074'],
    website: 'sagerx.com',
    founded: 2010,
    rdSpend: 280000000
  },
  {
    id: 'B014',
    name: 'Karuna Therapeutics',
    ticker: 'KRTX',
    marketCap: 7200000000,
    revenue: 0,
    employees: 280,
    headquarters: 'Boston, MA',
    therapeuticAreas: ['Neuroscience', 'Schizophrenia', 'Psychiatry'],
    pipelineCount: 5,
    phase1: 2,
    phase2: 2,
    phase3: 1,
    regulatory: 0,
    topDrugs: ['KarXT'],
    upcomingTrials: ['NCT05569645', 'NCT05490187'],
    website: 'karunatx.com',
    founded: 2009,
    rdSpend: 180000000
  },
  {
    id: 'B015',
    name: 'Maravai LifeSciences',
    ticker: 'MRVI',
    marketCap: 2800000000,
    revenue: 800000000,
    employees: 650,
    headquarters: 'San Diego, CA',
    therapeuticAreas: ['Life Sciences', 'Nucleic Acid Production', 'Diagnostics'],
    pipelineCount: 0,
    phase1: 0,
    phase2: 0,
    phase3: 0,
    regulatory: 0,
    topDrugs: ['CleanCap', 'Nucleotides'],
    upcomingTrials: [],
    website: 'maravai.com',
    founded: 2010,
    rdSpend: 85000000
  },
  {
    id: 'B016',
    name: 'Twist Bioscience',
    ticker: 'TWST',
    marketCap: 1800000000,
    revenue: 240000000,
    employees: 750,
    headquarters: 'South San Francisco, CA',
    therapeuticAreas: ['Synthetic Biology', 'DNA Synthesis', 'Diagnostics'],
    pipelineCount: 0,
    phase1: 0,
    phase2: 0,
    phase3: 0,
    regulatory: 0,
    topDrugs: ['DNA synthesis platform'],
    upcomingTrials: [],
    website: 'twistbioscience.com',
    founded: 2013,
    rdSpend: 120000000
  },
  {
    id: 'B017',
    name: 'Repligen',
    ticker: 'RGEN',
    marketCap: 6500000000,
    revenue: 680000000,
    employees: 2100,
    headquarters: 'Waltham, MA',
    therapeuticAreas: ['Bioprocessing', 'Chromatography', 'Filtration'],
    pipelineCount: 0,
    phase1: 0,
    phase2: 0,
    phase3: 0,
    regulatory: 0,
    topDrugs: ['Protein A', 'Chromatography resins'],
    upcomingTrials: [],
    website: 'repligen.com',
    founded: 1981,
    rdSpend: 45000000
  },
  {
    id: 'B018',
    name: 'Neurocrine Biosciences',
    ticker: 'NBIX',
    marketCap: 12500000000,
    revenue: 1750000000,
    employees: 1050,
    headquarters: 'San Diego, CA',
    therapeuticAreas: ['Neuroscience', 'Movement Disorders', 'Psychiatry'],
    pipelineCount: 16,
    phase1: 6,
    phase2: 6,
    phase3: 4,
    regulatory: 0,
    topDrugs: ['Ingrezza', 'Ongentys', 'Crinecerfont'],
    upcomingTrials: ['NCT05569676', 'NCT05490300'],
    website: 'neurocrine.com',
    founded: 1992,
    rdSpend: 380000000
  },
  {
    id: 'B019',
    name: 'Acadia Pharmaceuticals',
    ticker: 'ACAD',
    marketCap: 3200000000,
    revenue: 515000000,
    employees: 620,
    headquarters: 'San Diego, CA',
    therapeuticAreas: ['Neuroscience', 'Parkinson\'s Disease', 'Dementia', 'Schizophrenia'],
    pipelineCount: 12,
    phase1: 4,
    phase2: 5,
    phase3: 3,
    regulatory: 0,
    topDrugs: ['Nuplazid', 'Daybue'],
    upcomingTrials: ['NCT05569707', 'NCT05490413'],
    website: 'acadia-pharm.com',
    founded: 1993,
    rdSpend: 280000000
  },
  {
    id: 'B020',
    name: 'Legend Biotech',
    ticker: 'LEGN',
    marketCap: 1400000000,
    revenue: 95000000,
    employees: 850,
    headquarters: 'Somerset, NJ',
    therapeuticAreas: ['Cell Therapy', 'Multiple Myeloma', 'Oncology'],
    pipelineCount: 10,
    phase1: 4,
    phase2: 4,
    phase3: 2,
    regulatory: 0,
    topDrugs: ['Carvykti'],
    upcomingTrials: ['NCT05569738', 'NCT05490526'],
    website: 'legendbiotech.com',
    founded: 2014,
    rdSpend: 220000000
  }
]

// EXPANDED UPCOMING CLINICAL TRIALS
const UPCOMING_TRIALS = [
  {
    id: 'NCT05187578',
    title: 'Novel CAR-T Therapy for Relapsed B-Cell Lymphoma',
    company: 'Cytiva Therapeutics',
    drug: 'CTX-451',
    phase: 'Phase 2',
    indication: 'B-Cell Lymphoma',
    therapeuticArea: 'Oncology',
    enrollment: {
      current: 142,
      target: 200,
      screening: 45,
      randomized: 142
    },
    locations: 24,
    countries: ['USA', 'Canada', 'Germany', 'UK'],
    startDate: '2023-03-15',
    estimatedCompletion: '2025-08-30',
    primaryEndpoint: 'Overall Response Rate (ORR)',
    secondaryEndpoints: ['Complete Response', 'Duration of Response', 'Progression-Free Survival'],
    studyDuration: '24 months',
    retentionRate: 88,
    dropoutRate: 12,
    safetyProfile: 'Manageable cytokine release syndrome',
    previousResults: 'Phase 1: 89% ORR, 67% CR',
    mechanism: 'CD19-targeted CAR-T with 4-1BB co-stimulation',
    keyInvestigators: ['Dr. Sarah Chen - MD Anderson', 'Dr. Michael Ross - Memorial Sloan Kettering'],
    marketOpportunity: 2800000000,
    status: 'Active, recruiting'
  },
  {
    id: 'NCT04983272',
    title: 'Oral GLP-1 Agonist for Type 2 Diabetes',
    company: 'Metabolic Sciences Inc',
    drug: 'GLP-5701',
    phase: 'Phase 3',
    indication: 'Type 2 Diabetes',
    therapeuticArea: 'Metabolic',
    enrollment: {
      current: 1847,
      target: 2000,
      screening: 320,
      randomized: 1847
    },
    locations: 156,
    countries: ['USA', 'Canada', 'EU', 'Japan', 'Australia'],
    startDate: '2022-11-01',
    estimatedCompletion: '2024-12-15',
    primaryEndpoint: 'HbA1c Reduction at Week 52',
    secondaryEndpoints: ['Weight Loss', 'Cardiovascular Outcomes', 'Hypoglycemic Events'],
    studyDuration: '18 months',
    retentionRate: 92,
    dropoutRate: 8,
    safetyProfile: 'Mild GI events, no cardiovascular safety signals',
    previousResults: 'Phase 2: -1.8% HbA1c, 12% weight loss',
    mechanism: 'Small molecule GLP-1 receptor agonist with improved bioavailability',
    keyInvestigators: ['Dr. Robert Johnson - Joslin Diabetes Center', 'Dr. Lisa Park - University of Toronto'],
    marketOpportunity: 15000000000,
    status: 'Active, recruiting'
  },
  {
    id: 'NCT05042162',
    title: 'Gene Therapy for Duchenne Muscular Dystrophy',
    company: 'GenCure Biologics',
    drug: 'GT-DMD-01',
    phase: 'Phase 1/2',
    indication: 'Duchenne Muscular Dystrophy',
    therapeuticArea: 'Rare Disease',
    enrollment: {
      current: 18,
      target: 36,
      screening: 12,
      randomized: 18
    },
    locations: 8,
    countries: ['USA', 'Canada', 'UK'],
    startDate: '2024-01-10',
    estimatedCompletion: '2026-06-30',
    primaryEndpoint: 'Micro-dystrophin Expression at Month 12',
    secondaryEndpoints: ['NSAA Score', 'Muscle Function', 'Dystrophin Levels'],
    studyDuration: '36 months',
    retentionRate: 100,
    dropoutRate: 0,
    safetyProfile: 'Under evaluation, no serious AEs to date',
    previousResults: 'Preclinical: Robust expression, functional improvement',
    mechanism: 'AAVrh74-mediated micro-dystrophin delivery',
    keyInvestigators: ['Dr. Jerry Mendell - Nationwide Children\'s', 'Dr. Louise Rodino-Klapac - Sarepta'],
    marketOpportunity: 1200000000,
    status: 'Active, recruiting'
  },
  {
    id: 'NCT04872693',
    title: 'Anti-Tau Antibody for Early Alzheimer\'s Disease',
    company: 'NeuroShine Pharma',
    drug: 'TAU-998',
    phase: 'Phase 3',
    indication: 'Alzheimer\'s Disease',
    therapeuticArea: 'Neuroscience',
    enrollment: {
      current: 1563,
      target: 1800,
      screening: 280,
      randomized: 1563
    },
    locations: 203,
    countries: ['USA', 'Canada', 'EU', 'Japan', 'Australia'],
    startDate: '2021-09-20',
    estimatedCompletion: '2025-03-30',
    primaryEndpoint: 'CDR-SB Score Change at 18 Months',
    secondaryEndpoints: ['ADAS-Cog', 'MMSE', 'Brain Atrophy', 'Amyloid/Tau PET'],
    studyDuration: '24 months',
    retentionRate: 76,
    dropoutRate: 24,
    safetyProfile: 'ARIA-E in 18%, infusion reactions managed',
    previousResults: 'Phase 2: Trend toward benefit, not statistically significant',
    mechanism: 'Humanized anti-tau monoclonal antibody targeting mid-domain',
    keyInvestigators: ['Dr. Reisa Sperling - Brigham and Women\'s', 'Dr. Paul Aisen - USC'],
    marketOpportunity: 13000000000,
    status: 'Active, not recruiting'
  },
  {
    id: 'NCT05284714',
    title: 'KRAS G12C Inhibitor for Pancreatic Cancer',
    company: 'OncoTarget Therapeutics',
    drug: 'KRA-2024',
    phase: 'Phase 2',
    indication: 'Pancreatic Cancer',
    therapeuticArea: 'Oncology',
    enrollment: {
      current: 89,
      target: 120,
      screening: 35,
      randomized: 89
    },
    locations: 42,
    countries: ['USA', 'Canada', 'EU', 'South Korea'],
    startDate: '2023-08-05',
    estimatedCompletion: '2025-11-20',
    primaryEndpoint: 'Objective Response Rate (RECIST 1.1)',
    secondaryEndpoints: ['Disease Control Rate', 'PFS', 'OS', 'Duration of Response'],
    studyDuration: '18 months',
    retentionRate: 85,
    dropoutRate: 15,
    safetyProfile: 'Elevated liver enzymes manageable with dose modification',
    previousResults: 'Phase 1: 42% ORR in CRC, manageable safety',
    mechanism: 'Selective covalent KRAS G12C inhibitor with CNS penetration',
    keyInvestigators: ['Dr. John Strickler - Duke', 'Dr. Eileen O\'Reilly - Memorial Sloan Kettering'],
    marketOpportunity: 850000000,
    status: 'Active, recruiting'
  },
  {
    id: 'NCT05129478',
    title: 'CRISPR-Based Sickle Cell Cure',
    company: 'EditGen Therapeutics',
    drug: 'CRISPR-SC-001',
    phase: 'Phase 1/2',
    indication: 'Sickle Cell Disease',
    therapeuticArea: 'Gene Editing',
    enrollment: {
      current: 24,
      target: 45,
      screening: 18,
      randomized: 24
    },
    locations: 12,
    countries: ['USA', 'Canada', 'UK', 'Germany'],
    startDate: '2023-06-12',
    estimatedCompletion: '2026-09-15',
    primaryEndpoint: 'Fetal Hemoglobin Induction (%)',
    secondaryEndpoints: ['VOC-Free Days', 'Transfusion Independence', 'Pain Crisis Reduction'],
    studyDuration: '36 months',
    retentionRate: 100,
    dropoutRate: 0,
    safetyProfile: 'No GVHD, manageable myeloablation',
    previousResults: 'Early data: 100% HbF induction, pain crisis free',
    mechanism: 'CRISPR/Cas9 editing of BCL11A erythroid enhancer',
    keyInvestigators: ['Dr. Haydar Frangoul - Sarah Cannon', 'Dr. Alexis Thompson - Children\'s Hospital Philly'],
    marketOpportunity: 2100000000,
    status: 'Active, recruiting'
  }
]

// THERAPEUTIC AREAS
const THERAPEUTIC_AREAS = [
  'Oncology',
  'Immunology',
  'Neuroscience',
  'Cardiovascular',
  'Metabolic',
  'Rare Disease',
  'Infectious Disease',
  'Respiratory',
  'Ophthalmology',
  'Gene Therapy',
  'Cell Therapy',
  'Gene Editing',
  'Vaccines'
]

// DISEASE CATEGORIES
const DISEASE_CATEGORIES = [
  'Cancer - Hematologic',
  'Cancer - Solid Tumor',
  'Diabetes',
  'Obesity',
  'Alzheimer\'s Disease',
  'Parkinson\'s Disease',
  'Multiple Sclerosis',
  'Duchenne Muscular Dystrophy',
  'Sickle Cell Disease',
  'Hemophilia',
  'Autoimmune Disorders',
  'Rare Genetic Disorders',
  'Infectious Disease',
  'Cardiovascular Disease'
]

export default function PharmaDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPhase, setSelectedPhase] = useState<string>('all')
  const [selectedTherapeuticArea, setSelectedTherapeuticArea] = useState<string>('all')
  const [selectedDiseaseCategory, setSelectedDiseaseCategory] = useState<string>('all')
  const [selectedCompanyType, setSelectedCompanyType] = useState<string>('all')
  const [expandedTrial, setExpandedTrial] = useState<string | null>(null)
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'trials' | 'companies'>('trials')

  const allCompanies = [...PHARMA_COMPANIES, ...BIOTECH_COMPANIES]

  const filteredTrials = useMemo(() => {
    return UPCOMING_TRIALS.filter(trial => {
      const matchesSearch = 
        trial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.drug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.indication.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesPhase = selectedPhase === 'all' || trial.phase === selectedPhase
      const matchesTherapeuticArea = selectedTherapeuticArea === 'all' || trial.therapeuticArea === selectedTherapeuticArea
      const matchesDisease = selectedDiseaseCategory === 'all' || trial.indication.toLowerCase().includes(selectedDiseaseCategory.toLowerCase())
      
      return matchesSearch && matchesPhase && matchesTherapeuticArea && matchesDisease
    })
  }, [searchQuery, selectedPhase, selectedTherapeuticArea, selectedDiseaseCategory])

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter(company => {
      const matchesSearch = 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.therapeuticAreas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesType = selectedCompanyType === 'all' || 
        (selectedCompanyType === 'pharma' && PHARMA_COMPANIES.includes(company)) ||
        (selectedCompanyType === 'biotech' && BIOTECH_COMPANIES.includes(company))
      
      const matchesTherapeuticArea = selectedTherapeuticArea === 'all' || 
        company.therapeuticAreas.some(area => area === selectedTherapeuticArea)
      
      return matchesSearch && matchesType && matchesTherapeuticArea
    })
  }, [searchQuery, selectedCompanyType, selectedTherapeuticArea])

  const stats = useMemo(() => {
    const totalTrials = filteredTrials.length
    const totalCompanies = filteredCompanies.length
    const totalEnrollment = filteredTrials.reduce((sum, t) => sum + t.enrollment.target, 0)
    const totalMarket = filteredTrials.reduce((sum, t) => sum + t.marketOpportunity, 0)
    const avgRetention = filteredTrials.length > 0 
      ? filteredTrials.reduce((sum, t) => sum + t.retentionRate, 0) / filteredTrials.length 
      : 0
    
    return { totalTrials, totalCompanies, totalEnrollment, totalMarket, avgRetention }
  }, [filteredTrials, filteredCompanies])

  const phaseDistribution = useMemo(() => {
    const phases: Record<string, number> = {}
    UPCOMING_TRIALS.forEach(t => {
      phases[t.phase] = (phases[t.phase] || 0) + 1
    })
    return Object.entries(phases).map(([name, value]) => ({ name, value }))
  }, [])

  const COLORS = ['#0066A1', '#0891B2', '#6366F1', '#8B5CF6', '#10B981', '#F59E0B']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                <FlaskConical className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Pharma Intelligence Hub</h1>
                <p className="text-xs text-slate-500">Comprehensive Pharmaceutical & Biotech Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('trials')}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all",
                    viewMode === 'trials' 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Clinical Trials
                </button>
                <button
                  onClick={() => setViewMode('companies')}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all",
                    viewMode === 'companies' 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Companies
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{viewMode === 'trials' ? 'Active Trials' : 'Companies'}</p>
                <p className="text-2xl font-bold text-blue-600">{viewMode === 'trials' ? stats.totalTrials : stats.totalCompanies}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                {viewMode === 'trials' ? <FlaskConical className="w-5 h-5 text-blue-600" /> : <Building2 className="w-5 h-5 text-blue-600" />}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{viewMode === 'trials' ? 'Total Enrollment' : 'Total Pipeline'}</p>
                <p className="text-2xl font-bold text-emerald-600">{viewMode === 'trials' ? formatNumber(stats.totalEnrollment) : formatNumber(allCompanies.reduce((s, c) => s + c.pipelineCount, 0))}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Market Opportunity</p>
                <p className="text-2xl font-bold text-violet-600">{formatCurrency(stats.totalMarket)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-violet-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Avg Retention</p>
                <p className="text-2xl font-bold text-amber-600">{stats.avgRetention.toFixed(0)}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Top Therapeutic Area</p>
                <p className="text-lg font-bold text-cyan-600">Oncology</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={viewMode === 'trials' ? "Search trials, drugs, companies, indications..." : "Search companies, tickers, therapeutic areas..."}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {viewMode === 'trials' && (
                <>
                  <select
                    className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedPhase}
                    onChange={(e) => setSelectedPhase(e.target.value)}
                  >
                    <option value="all">All Phases</option>
                    <option value="Phase 1">Phase 1</option>
                    <option value="Phase 1/2">Phase 1/2</option>
                    <option value="Phase 2">Phase 2</option>
                    <option value="Phase 3">Phase 3</option>
                    <option value="Phase 4">Phase 4</option>
                  </select>
                  <select
                    className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDiseaseCategory}
                    onChange={(e) => setSelectedDiseaseCategory(e.target.value)}
                  >
                    <option value="all">All Disease Categories</option>
                    {DISEASE_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </>
              )}
              {viewMode === 'companies' && (
                <select
                  className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompanyType}
                  onChange={(e) => setSelectedCompanyType(e.target.value)}
                >
                  <option value="all">All Companies</option>
                  <option value="pharma">Top 30 Pharma</option>
                  <option value="biotech">Top 20 Biotech</option>
                </select>
              )}
              <select
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTherapeuticArea}
                onChange={(e) => setSelectedTherapeuticArea(e.target.value)}
              >
                <option value="all">All Therapeutic Areas</option>
                {THERAPEUTIC_AREAS.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              {viewMode === 'trials' ? 'Clinical Trials by Phase' : 'Companies by Market Cap'}
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              {viewMode === 'trials' ? (
                <BarChart data={phaseDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip contentStyle={{borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" fill="#0066A1" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={allCompanies.slice(0, 10).map(c => ({ name: c.ticker, value: c.marketCap ? c.marketCap / 1000000000 : c.revenue / 1000000000 }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip contentStyle={{borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-600" />
              {viewMode === 'trials' ? 'Therapeutic Area Distribution' : 'Pipeline Distribution'}
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={viewMode === 'trials' 
                    ? Object.entries(UPCOMING_TRIALS.reduce((acc, t) => {
                        acc[t.therapeuticArea] = (acc[t.therapeuticArea] || 0) + 1
                        return acc
                      }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }))
                    : [{ name: 'Phase 1', value: allCompanies.reduce((s, c) => s + c.phase1, 0) },
                       { name: 'Phase 2', value: allCompanies.reduce((s, c) => s + c.phase2, 0) },
                       { name: 'Phase 3', value: allCompanies.reduce((s, c) => s + c.phase3, 0) },
                       { name: 'Regulatory', value: allCompanies.reduce((s, c) => s + c.regulatory, 0) }]
                  }
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
          </div>
        </div>

        {/* Content */}
        {viewMode === 'trials' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Upcoming Clinical Trials to Watch
              </h2>
              <span className="text-sm text-slate-500">{filteredTrials.length} trials</span>
            </div>
            
            {filteredTrials.map((trial, idx) => (
              <div
                key={trial.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in"
                style={{animationDelay: `${idx * 50}ms`}}
              >
                <div 
                  className="p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedTrial(expandedTrial === trial.id ? null : trial.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-slate-400">{trial.id}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium border",
                          trial.phase === 'Phase 3' ? 'bg-violet-100 text-violet-700 border-violet-200' :
                          trial.phase === 'Phase 2' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          trial.phase === 'Phase 1/2' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                          'bg-slate-100 text-slate-700 border-slate-200'
                        )}>
                          {trial.phase}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700 border border-cyan-200">
                          {trial.therapeuticArea}
                        </span>
                      </div>
                      
                      {/* BIG COMPANY NAME */}
                      <div className="text-xl font-bold text-blue-700 mb-2">{trial.company}</div>
                      
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{trial.title}</h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Pill className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{trial.drug}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <HeartPulse className="w-4 h-4 text-red-500" />
                          {trial.indication}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-emerald-500" />
                          {trial.countries.length} countries
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-violet-500" />
                          {trial.enrollment.current}/{trial.enrollment.target} enrolled
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">{formatCurrency(trial.marketOpportunity)}</p>
                        <p className="text-xs text-slate-500">Market Opportunity</p>
                      </div>
                      {expandedTrial === trial.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedTrial === trial.id && (
                  <div className="border-t border-slate-200 p-5 bg-slate-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Enrollment & Study Details */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            Enrollment & Screening
                          </h4>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600">Overall Progress</span>
                                <span className="font-medium">{Math.round((trial.enrollment.current / trial.enrollment.target) * 100)}%</span>
                              </div>
                              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full transition-all"
                                  style={{width: `${(trial.enrollment.current / trial.enrollment.target) * 100}%`}}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="p-2 bg-blue-50 rounded">
                                <p className="text-slate-500 text-xs">Screening</p>
                                <p className="font-semibold text-blue-700">{trial.enrollment.screening}</p>
                              </div>
                              <div className="p-2 bg-emerald-50 rounded">
                                <p className="text-slate-500 text-xs">Randomized</p>
                                <p className="font-semibold text-emerald-700">{trial.enrollment.randomized}</p>
                              </div>
                            </div>
                            
                            <div className="pt-2 border-t border-slate-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Retention Rate</span>
                                <span className="font-medium text-emerald-600">{trial.retentionRate}%</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-slate-600">Dropout Rate</span>
                                <span className="font-medium text-amber-600">{trial.dropoutRate}%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            Study Timeline
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Study Start</span>
                              <span className="font-medium">{trial.startDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Est. Completion</span>
                              <span className="font-medium">{trial.estimatedCompletion}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Duration</span>
                              <span className="font-medium">{trial.studyDuration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Status</span>
                              <span className="font-medium text-emerald-600">{trial.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Study Design */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Beaker className="w-4 h-4 text-violet-600" />
                            Study Design
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-slate-500">Primary Endpoint: </span>
                              <span className="font-medium text-slate-900">{trial.primaryEndpoint}</span>
                            </div>
                            <div className="pt-2 border-t border-slate-100">
                              <p className="text-slate-500 mb-1">Secondary Endpoints:</p>
                              <ul className="list-disc list-inside text-slate-700">
                                {trial.secondaryEndpoints.map((ep, i) => (
                                  <li key={i}>{ep}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-2 border-t border-slate-100">
                              <span className="text-slate-500">Mechanism: </span>
                              <span className="text-slate-700">{trial.mechanism}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Stethoscope className="w-4 h-4 text-cyan-600" />
                            Safety & Previous Results
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-slate-500">Safety Profile: </span>
                              <span className="text-slate-700">{trial.safetyProfile}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Previous Results: </span>
                              <span className="text-slate-700">{trial.previousResults}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sites & Investigators */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-emerald-600" />
                            Study Sites
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Total Sites</span>
                              <span className="font-medium">{trial.locations}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Countries</span>
                              <span className="font-medium">{trial.countries.length}</span>
                            </div>
                            <div className="pt-2">
                              <p className="text-slate-500 mb-1">Participating:</p>
                              <div className="flex flex-wrap gap-1">
                                {trial.countries.map(country => (
                                  <span key={country} className="px-2 py-0.5 bg-slate-100 rounded text-xs">{country}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Microscope className="w-4 h-4 text-pink-600" />
                            Key Investigators
                          </h4>
                          <div className="space-y-2 text-sm">
                            {trial.keyInvestigators.map((investigator, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5" />
                                <span className="text-slate-700">{investigator}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {selectedCompanyType === 'pharma' ? 'Top 30 Pharmaceutical Companies' : 
                 selectedCompanyType === 'biotech' ? 'Top 20 Biotech Companies' : 
                 'Pharmaceutical & Biotech Companies'}
              </h2>
              <span className="text-sm text-slate-500">{filteredCompanies.length} companies</span>
            </div>
            
            {filteredCompanies.map((company, idx) => (
              <div
                key={company.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in"
                style={{animationDelay: `${idx * 30}ms`}}
              >
                <div 
                  className="p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedCompany(expandedCompany === company.id ? null : company.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-slate-400">{company.ticker}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium border",
                          BIOTECH_COMPANIES.includes(company) ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                        )}>
                          {BIOTECH_COMPANIES.includes(company) ? 'Biotech' : 'Pharma'}
                        </span>
                      </div>
                      
                      <div className="text-2xl font-bold text-slate-900 mb-1">{company.name}</div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mt-3">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-blue-500" />
                          {company.headquarters}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-emerald-500" />
                          {formatNumber(company.employees)} employees
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FlaskConical className="w-4 h-4 text-violet-500" />
                          {company.pipelineCount} pipeline programs
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          Founded {company.founded}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {company.therapeuticAreas.slice(0, 4).map(area => (
                          <span key={area} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                            {area}
                          </span>
                        ))}
                        {company.therapeuticAreas.length > 4 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                            +{company.therapeuticAreas.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">
                          {company.marketCap ? formatCurrency(company.marketCap) : 'Private'}
                        </p>
                        <p className="text-xs text-slate-500">Market Cap</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">{formatCurrency(company.revenue)}</p>
                        <p className="text-xs text-slate-500">Revenue</p>
                      </div>
                      {expandedCompany === company.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedCompany === company.id && (
                  <div className="border-t border-slate-200 p-5 bg-slate-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Financials */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            Financial Overview
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Market Cap</span>
                              <span className="font-medium">{company.marketCap ? formatCurrency(company.marketCap) : 'Private'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Annual Revenue</span>
                              <span className="font-medium">{formatCurrency(company.revenue)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">R&D Spend</span>
                              <span className="font-medium">{formatCurrency(company.rdSpend)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">R&D % of Revenue</span>
                              <span className="font-medium">{((company.rdSpend / company.revenue) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Employees</span>
                              <span className="font-medium">{formatNumber(company.employees)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            Company Info
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Headquarters</span>
                              <span className="font-medium">{company.headquarters}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Founded</span>
                              <span className="font-medium">{company.founded}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Website</span>
                              <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{company.website}</a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pipeline */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <FlaskConical className="w-4 h-4 text-violet-600" />
                            Clinical Pipeline ({company.pipelineCount} programs)
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="p-2 bg-blue-50 rounded">
                              <p className="text-slate-500 text-xs">Phase 1</p>
                              <p className="font-semibold text-blue-700">{company.phase1}</p>
                            </div>
                            <div className="p-2 bg-indigo-50 rounded">
                              <p className="text-slate-500 text-xs">Phase 2</p>
                              <p className="font-semibold text-indigo-700">{company.phase2}</p>
                            </div>
                            <div className="p-2 bg-violet-50 rounded">
                              <p className="text-slate-500 text-xs">Phase 3</p>
                              <p className="font-semibold text-violet-700">{company.phase3}</p>
                            </div>
                            <div className="p-2 bg-emerald-50 rounded">
                              <p className="text-slate-500 text-xs">Regulatory</p>
                              <p className="font-semibold text-emerald-700">{company.regulatory}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <HeartPulse className="w-4 h-4 text-red-600" />
                            Therapeutic Areas
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {company.therapeuticAreas.map(area => (
                              <span key={area} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Top Drugs */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Pill className="w-4 h-4 text-amber-600" />
                            Key Products & Programs
                          </h4>
                          <div className="space-y-2">
                            {company.topDrugs.map((drug, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span className="text-slate-700">{drug}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {company.upcomingTrials.length > 0 && (
                          <div className="bg-white rounded-lg p-4 border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <Activity className="w-4 h-4 text-cyan-600" />
                              Upcoming Trial Readouts
                            </h4>
                            <div className="space-y-2">
                              {company.upcomingTrials.map((trial, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                  <span className="font-mono text-xs text-slate-500">{trial}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {((viewMode === 'trials' && filteredTrials.length === 0) || (viewMode === 'companies' && filteredCompanies.length === 0)) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No results found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}
