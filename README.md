# Sleep Data Visualization App

This project is a web application built with Next.js and TypeScript that visualizes sleep data for multiple users. It uses Charts for data visualization and GSAP for animations. This README provides instructions on how to set up and use the application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm

## Installation

1. **Clone the repository:**

   ```bash
   git clone repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Project Structure

Here's a quick overview of the project's structure (easier to read in VSCode):

├── app
│ ├── api
│ │ ├── user
│ │ │ └── [id]
│ │ │ └── route.ts
│ │ └── users
│ │ └── route.ts
│ ├── components
│ │ ├── Hero.tsx
│ │ ├── UserProfile.tsx
│ │ └── ui
│ │ ├── Avatar.tsx
│ │ ├── FamilySummary.tsx
│ │ └── Loader.tsx
│ ├── hooks
│ │ ├── useGetUsers.ts
│ │ └── utils.ts
│ └── lib
│ └── types.ts
├── pages
│ └── index.tsx
├── public
├── styles
│ └── globals.css
└── README.md

## Components

### `Hero.tsx`

The `Hero` component is the main entry point of the application. It fetches user data and displays a summary for each family member. Each family member's data is visualized using a Doughnut chart. This chart summarized the few days of sleep data provided.

### `UserProfile.tsx`

The `UserProfile` component displays detailed data for a single user. It includes line charts for heart rate and respiratory rate, as well as a bar chart for sleep stages.

### UI Components

- **Avatar.tsx**: Displays the user's avatar.
- **FamilySummary.tsx**: Summarizes the sleep data for all family members.
- **Loader.tsx**: Shows a loading spinner while data is being fetched.

## API Routes

### `/api/user/[id]/route.ts`

Fetches detailed sleep data for a specific user from the Eight Sleep public challenge API.

### `/api/users/route.ts`

Fetches a list of users from the Eight Sleep public challenge API.

## Hooks

### `useGetUsers.ts`

A custom hook that fetches user data and their detailed sleep information. It handles both fetching all users and fetching a specific user by ID.

### `utils.ts`

Contains utility functions used throughout the application, such as `formatDuration` and `secondsToHours`.

## How to Use the Application

1. **Home Page**:

   - Displays a welcome message and a summary of the family's sleep data.
   - Each family member's summary includes their name, average sleep score, and a Doughnut chart visualizing their sleep stages.

2. **User Profile Page**:

   - Click on a family member's card to navigate to their detailed profile page.
   - The profile page shows detailed charts for heart rate, respiratory rate, and sleep stages.

3. **Navigation**:
   - Use the navigation links to switch between different user profiles and return to the home page.

## Notes

- The sleep data and user information are fetched from the Eight Sleep public challenge API.
- The application uses `GSAP` for smooth animations.
