export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          About Us
        </h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
            Welcome to Pro UI Kit, a comprehensive UI component library built with modern web technologies.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Our mission is to provide developers with a professional, production-ready UI kit that
            accelerates development while maintaining high code quality and best practices.
          </p>
          <h2 className="text-2xl font-display font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            Our Technology Stack
          </h2>
          <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-2">
            <li>Next.js 14 with App Router</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS for styling</li>
            <li>Redux Toolkit for state management</li>
            <li>React Query for server state</li>
            <li>Axios for HTTP requests</li>
          </ul>
        </div>
      </div>
  );
}

