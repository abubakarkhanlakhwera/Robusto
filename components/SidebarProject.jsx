'use client';

import Link from 'next/link';
import { useTodoStore } from '@/lib/store';
import { StarIcon as Solid } from '@heroicons/react/24/solid';
import { StarIcon as Outline } from '@heroicons/react/24/outline';

export default function SidebarProject({ project, level }) {
  const toggleFav = useTodoStore((s) => s.toggleFavorite);
  const projects = useTodoStore((s) => s.projects);
  const children = projects.filter((p) => p.parentId === project.id);

  return (
    <li>
      <div className="flex items-center gap-2" style={{ marginLeft: level * 16 }}>
        <span
          className="w-2 h-2 rounded-full inline-block"
          style={{ backgroundColor: project.color }}
        />
        <Link
          href={`/projects/${project.id}`}
          className="flex-1 text-sm text-gray-700 hover:text-blue-600"
        >
          {project.name}
        </Link>
        <button onClick={() => toggleFav(project.id)} className="p-1">
          {project.isFavorite ? (
            <Solid className="w-4 h-4 text-yellow-500" />
          ) : (
            <Outline className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>
      {children.length > 0 && (
        <ul>
          {children.map((c) => (
            <SidebarProject key={c.id} project={c} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
