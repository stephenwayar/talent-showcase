# SkillLink: Talent Showcase App

## Description
**A modern talent-sharing platform where users can showcase their skills and discover talented individuals. SkillLink enables users to create profiles, share their expertise through posts, and explore skills shared by others in an engaging feed-based interface.**

## Core Features
* **User Authentication**: Secure registration/login using Supabase Auth
* **Profile Management**: Create and edit personal profiles with customizable details
* **Skill Showcase**: Post your talents with images and descriptions
* **Explore Feed**: Discover skills shared by the community
* **User Discovery**: View other users' profiles and their shared skills

## Technologies and Stack
* **Frontend Framework**: React with TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Backend & Authentication**: Supabase
* **Data Fetching**: TanStack Query (React Query)
* **Component Library**: Mantine Component Library
* **Storage**: Supabase Storage for images

## Key Implementation Details
* Real-time data fetching with React Query
* Image upload with preview functionality
* Responsive design across all device sizes
* Protected routes with authentication guards
* Optimized component reusability

## Live Demo
* **Live Preview**: [SkillLink App](https://talent-showcase-rust.vercel.app/)
* **Demo Account**:
   * Email: john@doe.com
   * Password: john@doe.com

## Running Locally
1. Clone the repository
   ```bash
   git clone https://github.com/stephenwayar/talent-showcase.git
   cd talent-showcase
   ```

2. Create a `.env` file with Supabase credentials (shared privately via email):
   ```
   VITE_APP_SUPABASE_URL=your_supabase_url
   VITE_APP_SUPABASE_KEY=your_supabase_anon_key
   VITE_APP_ENCRYPTION_KEY=your_encryption_key
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure
```
/src
  /components     # Reusable UI components
  /pages          # Page components for each route
  /hooks          # Custom React hooks
  /services       # API and data services
  /config          # Utility code and Supabase client
  /assets         # Static assets like images
  /contexts       # TypeScript type definitions
  /helpers        # Helper functions and utilities
  /layouts        # Layout components
  /providers      # Context providers
  /routes         # Route configurations
```

## Database Schema
* **accounts**: User profiles with extended information
* **posts**: Skill posts with descriptions and image URLs
* **storage buckets**: 'profile-photos' and 'post-images'

## Author
**Name**: Stephen Bulus  
**Email**: stephenbuluswayar@gmail.com
**GitHub**: [stephenwayar](https://github.com/stephenwayar)  
**X (formerly Twitter)**: [@stephenwayar](https://x.com/stephenwayar)