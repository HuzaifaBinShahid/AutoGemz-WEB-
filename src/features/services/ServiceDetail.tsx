import type { Service } from "@/interfaces";
import Button from "@/components/common/Button";
import Link from "next/link";

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-6">
        {service.title}
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
        {service.description}
      </p>
      {service.price && (
        <div className="mb-8">
          <p className="text-3xl font-display font-bold text-primary-600 dark:text-primary-400">
            ${service.price.toLocaleString()}
          </p>
        </div>
      )}
      <Link href="/contact">
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
}

