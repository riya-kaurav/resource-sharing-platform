import ResourceCard from "./ResourceCard";

export default function ResourceGrid({ resources }) {
  if (!resources || resources.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        No resources found.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource._id} resource={resource} />
      ))}
    </div>
  );
}