# IUB Faculty Connect

A modern, responsive web application built with Next.js to display faculty information from Independent University, Bangladesh (IUB). The application features a clean, card-based interface with powerful search and filtering capabilities.

## Features

✨ **Key Features:**
- 📋 Display faculty information in an intuitive card-based layout
- 🔍 Search by faculty name with real-time filtering
- 🏫 Filter by school (e.g., SEBE, SLASS, SBS)
- 🎓 Filter by department (e.g., CSE, EEE, Business Administration)
- 📄 Pagination with "Load More" functionality
- 📱 Fully responsive design (mobile, tablet, and desktop)
- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark mode support
- ⚡ Built with Next.js 15 and React 19
- 🔤 TypeScript for type safety

## Technology Stack

- **Framework:** Next.js 15.5.5 (App Router)
- **UI Library:** React 19.1.0
- **Styling:** Tailwind CSS 4.0
- **Language:** TypeScript 5
- **Build Tool:** Turbopack

## Getting Started

### Prerequisites

- Node.js 20+ or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mikealvarez9999/IUBFacultyConnect.git
cd IUBFacultyConnect
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── faculties/
│   │   │       └── route.ts          # API route for faculty data
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main page component
│   ├── components/
│   │   ├── FacultyCard.tsx           # Faculty card component
│   │   └── SearchFilters.tsx         # Search filter component
│   └── types/
│       └── faculty.ts                # TypeScript type definitions
├── public/                           # Static assets
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

## API Integration

The application is designed to integrate with the IUB Faculty API:
```
https://iub.ac.bd/api/faculties-academic-staffs
```

**Query Parameters:**
- `school` - Filter by school name
- `department` - Filter by department name
- `page` - Page number for pagination
- `size` - Number of results per page
- `slug` - Optional slug parameter

**Note:** The application includes sample data as a fallback when the external API is unavailable.

## Usage

### Searching Faculty

1. **By Name:** Type the faculty member's name in the "Faculty Name" search box
2. **By School:** Enter the school name (e.g., "SEBE", "SLASS", "SBS")
3. **By Department:** Enter the department name (e.g., "CSE", "EEE")

Filters can be combined for more precise results.

### Loading More Results

Click the "Load More" button at the bottom of the page to load additional faculty members (20 at a time).

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- ESLint for code linting
- TypeScript for type checking
- Prettier-compatible formatting

## Responsive Design

The application is optimized for all screen sizes:
- **Mobile:** Single column layout (< 640px)
- **Tablet:** Two column grid (≥ 640px)
- **Desktop:** Three to four column grid (≥ 1024px)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Next.js and Tailwind CSS**
