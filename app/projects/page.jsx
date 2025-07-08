'use client';

import Layout from '@/components/Layout';
import TaskItem from '@/components/TaskItem';
import { useTodoStore } from '@/lib/store';
import { useState } from 'react';

export default function ProjectsPage() {
  const [projectName, setProjectName] = useState('');
  const projects = useTodoStore((s) => s.projects);
  const addProject = useTodoStore((s) => s.addProject);
  const todos = useTodoStore((s) => s.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;
    addProject(projectName.trim());
    setProjectName('');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">📁 Projects</h1>

        {/* Add New Project */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Add new project..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add
          </button>
        </form>

        {/* Project List */}
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects added yet.</p>
        ) : (
          projects.map((project) => {
            const projectTasks = todos.filter(
              (todo) => todo.projectId === project.id && todo.parentId === null
            );
            return (
              <div key={project.id} className="bg-white shadow rounded p-4 space-y-2">
                <h2 className="font-semibold text-lg text-blue-700">{project.name}</h2>
                {projectTasks.length === 0 ? (
                  <p className="text-gray-400 text-sm">No tasks in this project.</p>
                ) : (
                  projectTasks.map((todo) => <TaskItem key={todo.id} todo={todo} />)
                )}
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}
