# Backend Setup Guide for Game Tracker with Supabase

This guide will walk you through adding backend functionality to your Game Tracker application using Supabase.

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Node.js and npm/pnpm installed
- Basic understanding of React and TypeScript

---

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in:
   - Project name: `game-tracker`
   - Database password: (create a strong password and save it)
   - Region: (choose closest to your users)
4. Wait for project to finish setting up (2-3 minutes)
5. Once ready, go to Project Settings > API
6. Copy these values (you'll need them later):
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - `anon` public key (starts with `eyJ...`)

---

## Step 2: Install Supabase Client

**File to modify:** `package.json`

Run this command in your terminal:
```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

---

## Step 3: Create Environment Variables File

**File to create:** `.env.local` (in root directory)

Add this content:
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 1.

**Important:** Add `.env.local` to your `.gitignore` file to keep your keys secret!

---

## Step 4: Create Supabase Client Configuration

**File to create:** `src/lib/supabase.ts`

Add this content:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## Step 5: Design Your Database Schema

Go to Supabase Dashboard > SQL Editor and create tables for your game tracker.

**Recommended tables:**

### Table 1: `games`
```sql
CREATE TABLE games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  platform TEXT,
  status TEXT CHECK (status IN ('playing', 'completed', 'backlog', 'wishlist')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  hours_played DECIMAL,
  notes TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own games
CREATE POLICY "Users can view own games" ON games
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own games
CREATE POLICY "Users can insert own games" ON games
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own games
CREATE POLICY "Users can update own games" ON games
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own games
CREATE POLICY "Users can delete own games" ON games
  FOR DELETE USING (auth.uid() = user_id);
```

### Table 2: `user_profiles` (optional, for extended user info)
```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);
```

---

## Step 6: Set Up Authentication

**File to create:** `src/lib/auth.ts`

Add authentication helper functions:
```typescript
import { supabase } from './supabase'

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

---

## Step 7: Create Database Helper Functions

**File to create:** `src/lib/database.ts`

Add CRUD operations for games:
```typescript
import { supabase } from './supabase'

export interface Game {
  id?: string
  user_id?: string
  title: string
  platform?: string
  status?: 'playing' | 'completed' | 'backlog' | 'wishlist'
  rating?: number
  hours_played?: number
  notes?: string
  cover_image_url?: string
  created_at?: string
  updated_at?: string
}

// Fetch all games for current user
export async function getGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Add a new game
export async function addGame(game: Game) {
  const { data, error } = await supabase
    .from('games')
    .insert([game])
    .select()
  
  return { data, error }
}

// Update a game
export async function updateGame(id: string, updates: Partial<Game>) {
  const { data, error } = await supabase
    .from('games')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
  
  return { data, error }
}

// Delete a game
export async function deleteGame(id: string) {
  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', id)
  
  return { error }
}

// Get a single game by ID
export async function getGameById(id: string) {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}
```

---

## Step 8: Create Authentication Components

**File to create:** `src/components/Auth/LoginForm.tsx`

Create a login form component that uses the auth functions from Step 6.

**File to create:** `src/components/Auth/SignUpForm.tsx`

Create a signup form component.

**File to create:** `src/components/Auth/AuthProvider.tsx`

Create a context provider to manage authentication state across your app.

---

## Step 9: Protect Routes

**File to modify:** Your main routing file (e.g., `src/App.tsx` or `src/router.tsx`)

Add authentication checks:
- Redirect unauthenticated users to login page
- Only show game tracker features to logged-in users
- Use the AuthProvider to wrap your app

---

## Step 10: Integrate Database Functions into Components

**Files to modify:** Your existing game list/management components

Replace any mock data or local state with:
- `getGames()` to fetch games from Supabase
- `addGame()` when creating new games
- `updateGame()` when editing games
- `deleteGame()` when removing games

Example usage in a component:
```typescript
import { useEffect, useState } from 'react'
import { getGames, addGame } from '../lib/database'

function GameList() {
  const [games, setGames] = useState([])

  useEffect(() => {
    loadGames()
  }, [])

  async function loadGames() {
    const { data, error } = await getGames()
    if (error) {
      console.error('Error loading games:', error)
    } else {
      setGames(data || [])
    }
  }

  // ... rest of component
}
```

---

## Step 11: Test Your Backend

1. Start your development server: `npm run dev`
2. Test user registration
3. Test user login
4. Test adding a game
5. Test viewing games
6. Test updating a game
7. Test deleting a game
8. Test logout

---

## Step 12: Optional Enhancements

### Enable Email Confirmation
- Go to Supabase Dashboard > Authentication > Settings
- Configure email templates
- Enable email confirmation

### Add Social Login
- Go to Supabase Dashboard > Authentication > Providers
- Enable Google, GitHub, etc.
- Update your auth functions to support social login

### Add Storage for Game Cover Images
- Go to Supabase Dashboard > Storage
- Create a bucket called `game-covers`
- Set up policies for uploading/viewing images
- Create upload functions in your code

### Add Real-time Updates
```typescript
// Subscribe to changes in games table
const subscription = supabase
  .channel('games-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'games' },
    (payload) => {
      console.log('Change received!', payload)
      // Update your UI
    }
  )
  .subscribe()
```

---

## Troubleshooting

### Common Issues:

1. **"Missing environment variables" error**
   - Make sure `.env.local` exists and has correct values
   - Restart your dev server after adding env variables

2. **"Row Level Security policy violation" error**
   - Check that RLS policies are set up correctly
   - Make sure user is authenticated before accessing data

3. **CORS errors**
   - Add your local development URL to Supabase allowed origins
   - Go to Dashboard > Settings > API > URL Configuration

4. **Authentication not persisting**
   - Supabase stores session in localStorage by default
   - Check browser console for errors

---

## Summary of Files to Create/Modify

**New files to create:**
1. `.env.local` - Environment variables
2. `src/lib/supabase.ts` - Supabase client
3. `src/lib/auth.ts` - Authentication functions
4. `src/lib/database.ts` - Database CRUD functions
5. `src/components/Auth/LoginForm.tsx` - Login UI
6. `src/components/Auth/SignUpForm.tsx` - Signup UI
7. `src/components/Auth/AuthProvider.tsx` - Auth context

**Files to modify:**
1. `package.json` - Add @supabase/supabase-js dependency
2. `.gitignore` - Add .env.local
3. Your routing file - Add auth protection
4. Your game management components - Integrate database functions

---

## Next Steps

1. Complete Steps 1-5 first (setup and configuration)
2. Then do Steps 6-7 (create helper functions)
3. Then Steps 8-9 (add authentication UI)
4. Finally Step 10 (integrate into existing components)
5. Test everything in Step 11

Good luck with your backend implementation! 🚀