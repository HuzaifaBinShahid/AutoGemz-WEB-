/**
 * Test component to verify lazy loading
 * Use this in a page to test the Suspense fallback
 */
export default async function LazyTestComponent() {
  // Simulate a slow async operation (e.g., data fetching)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="p-8 bg-green-100 dark:bg-green-900 rounded-lg border-2 border-green-500">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">
        ✅ Lazy Loading Test Component
      </h2>
      <p className="text-green-700 dark:text-green-300">
        If you see this, the component has loaded successfully!
      </p>
      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
        The loading spinner should have appeared for 2 seconds before this content.
      </p>
    </div>
  );
}

