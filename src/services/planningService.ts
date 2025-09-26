// Mock planning service for generating smart farming tasks

interface UserMetadata {
  location: string;
  farmSize: string;
  cropTypes: string;
  name?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  completed: boolean;
}

export const generateSmartPlan = async (userMetadata: UserMetadata): Promise<Task[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const currentDate = new Date();
  const tasks: Task[] = [];
  
  // Generate tasks based on user's farm size and crop types
  const cropTypes = userMetadata.cropTypes?.toLowerCase() || 'rice, wheat';
  const farmSize = userMetadata.farmSize || 'medium';
  
  // Planting tasks
  if (cropTypes.includes('rice')) {
    tasks.push({
      id: 'plant_rice_1',
      title: 'Prepare Rice Seedbed',
      description: 'Prepare the seedbed for rice cultivation with proper soil preparation and water management',
      dueDate: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      category: 'planting',
      completed: false
    });
  }
  
  if (cropTypes.includes('wheat')) {
    tasks.push({
      id: 'plant_wheat_1',
      title: 'Wheat Sowing',
      description: 'Optimal time for wheat sowing based on current weather conditions',
      dueDate: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      category: 'planting',
      completed: false
    });
  }
  
  // Irrigation tasks
  tasks.push({
    id: 'irrigation_1',
    title: 'Check Irrigation System',
    description: 'Inspect and maintain irrigation channels and equipment',
    dueDate: new Date(currentDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    category: 'irrigation',
    completed: false
  });
  
  tasks.push({
    id: 'irrigation_2',
    title: 'Schedule Watering',
    description: 'Plan watering schedule based on weather forecast and crop requirements',
    dueDate: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    category: 'irrigation',
    completed: false
  });
  
  // Fertilization tasks
  tasks.push({
    id: 'fertilizer_1',
    title: 'Apply Base Fertilizer',
    description: 'Apply NPK fertilizer based on soil test recommendations',
    dueDate: new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    category: 'fertilization',
    completed: false
  });
  
  tasks.push({
    id: 'fertilizer_2',
    title: 'Organic Compost Application',
    description: 'Apply organic compost to improve soil health and fertility',
    dueDate: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    category: 'fertilization',
    completed: false
  });
  
  // Maintenance tasks
  tasks.push({
    id: 'maintenance_1',
    title: 'Equipment Maintenance',
    description: 'Service and maintain farming equipment for optimal performance',
    dueDate: new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    category: 'maintenance',
    completed: false
  });
  
  tasks.push({
    id: 'maintenance_2',
    title: 'Pest Control Inspection',
    description: 'Regular inspection for pests and diseases, apply preventive measures',
    dueDate: new Date(currentDate.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    category: 'maintenance',
    completed: false
  });
  
  // Harvesting tasks (future)
  if (cropTypes.includes('wheat')) {
    tasks.push({
      id: 'harvest_wheat_1',
      title: 'Wheat Harvest Preparation',
      description: 'Prepare for wheat harvesting - check equipment and weather conditions',
      dueDate: new Date(currentDate.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'low',
      category: 'harvesting',
      completed: false
    });
  }
  
  // Add more tasks based on farm size
  if (farmSize === 'large') {
    tasks.push({
      id: 'large_farm_1',
      title: 'Field Mapping',
      description: 'Create detailed field maps for precision agriculture',
      dueDate: new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      category: 'maintenance',
      completed: false
    });
  }
  
  return tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};