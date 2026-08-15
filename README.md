# 🍽️ MenuMate (메뉴메이트)

> **"오늘 뭐 먹지?" 고민 끝!**  
> 단체 회식 및 배달 음식 결정을 돕는 맞춤형 3단계 AI 메뉴 추천 & 취향 분석 서비스

[![Vercel Deployment](https://img.shields.io/badge/Deployed_with-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Supabase Database](https://img.shields.io/badge/Database-Supabase-3ecf8e?style=flat&logo=supabase)](https://supabase.com)
[![Gemini LLM](https://img.shields.io/badge/AI-Google_Gemini_1.5_Flash-4285f4?style=flat&logo=google)]()

---

## ✨ 핵심 기능

1. **1단계: 이용자 취향 프로필 관리 (Food DNA & 알레르기)**
   - 선호 / 불호 음식 (한식, 중식, 일식, 양식 카테고리별 최대 5개 선택)
   - 4차원 Food DNA 취향 점수 (매운맛, 기름짐, 육류 vs 해산물, 단짠 자극)
   - 알레르기 성분 (100% 원천 배제 필터링)
   - 최근 식사 기록 (3일 이내 -30%, 7일 이내 -15% 페널티 적용)
   - **Supabase Cloud PostgreSQL DB 실시간 CRUD 동기화** (로컬 스토리지 Fallback 지원)

2. **2단계: 회식 멤버 선택 및 조건 설정**
   - 참여 멤버 동적 선택 (다중 선택, 전체 선택/해제)
   - 1인당 예산 한도 설정
   - 모임 최대 허용 맵기 레벨 설정

3. **3단계: 맞춤형 TOP 3 추천 & 실시간 그룹 투표**
   - **Google Gemini 1.5 Flash LLM** 또는 **MenuMate 내장 불호방어 알고리즘** 기반 최적 메뉴 3종 산출
   - 멤버별 예상 만족도 및 코멘트 시각화
   - **스마트 재추천 기능**: 기존 추천 메뉴를 자동으로 배제하고 새로운 대안 메뉴 도출
   - 실시간 그룹 투표 및 최종 주문 확정 (Confetti 효과)

---

## 🛠️ 기술 스택

- **Frontend**: Vanilla HTML5, Modern CSS3 (Pretendard Font, Responsive Design), Vanilla JavaScript (ES6+)
- **Database**: Supabase (Cloud PostgreSQL) via `@supabase/supabase-js` CDN
- **AI Engine**: Google Gemini 1.5 Flash REST API & MenuMate Intelligent Fallback Engine
- **Hosting / Serverless**: Vercel Serverless Function (`/api/config.js`)

---

## 🚀 시작하기 & Vercel 환경 변수 설정

### 1. Supabase SQL 테이블 생성
Supabase 대시보드의 **SQL Editor**에서 아래 쿼리를 실행하세요:

```sql
CREATE TABLE IF NOT EXISTS public.menumate_users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT DEFAULT '멤버',
    avatar TEXT DEFAULT '🧑‍💻',
    likes JSONB DEFAULT '[]'::jsonb,
    dislikes JSONB DEFAULT '[]'::jsonb,
    dna JSONB NOT NULL DEFAULT '{"spice":0,"greasy":0,"meat":0,"sweet":0}'::jsonb,
    allergies JSONB DEFAULT '[]'::jsonb,
    recent_meals JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.menumate_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-write" ON public.menumate_users FOR ALL TO public USING (true) WITH CHECK (true);
```

### 2. Vercel 환경 변수 (Environment Variables) 등록

Vercel 대시보드 -> **Settings** -> **Environment Variables**에 다음을 등록합니다:

| Key | 설명 | 필수 여부 |
|---|---|---|
| `SUPABASE_URL` | Supabase Project URL | 선택 (UI 직접 입력 가능) |
| `SUPABASE_ANON_KEY` | Supabase anon public Key | 선택 (UI 직접 입력 가능) |
| `GEMINI_API_KEY` | Google Gemini API Key | 선택 (미입력 시 내장 알고리즘 작동) |

---

## 📄 라이선스
MIT License
