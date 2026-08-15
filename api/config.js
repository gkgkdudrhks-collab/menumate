// Vercel Serverless Function: /api/config
// Vercel 환경 변수에 등록된 Supabase 및 Gemini 설정을 프론트엔드로 안전하게 전달합니다.

export default function handler(req, res) {
  // CORS 및 캐시 제어 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vercel 환경 변수 읽기 (표준 이름 및 NEXT_PUBLIC 접두사 모두 지원)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

  return res.status(200).json({
    supabaseUrl,
    supabaseAnonKey,
    geminiApiKey,
    isVercelEnv: true,
    timestamp: new Date().toISOString()
  });
}
