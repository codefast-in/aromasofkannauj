
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { GENDER_CATEGORIES, PERFUME_NOTES, PERFUME_TYPES } from '@/config/constants';

interface Category {
  id: string;
  name: string;
  type: 'gender' | 'note' | 'type';
  count: number;
}

const AdminCategories = () => {
  // Format all categories into a unified structure
  const initialCategories: Category[] = [
    ...GENDER_CATEGORIES.map(cat => ({ 
      id: `gender-${cat.toLowerCase()}`, 
      name: cat, 
      type: 'gender' as const, 
      count: 12 // Mock count
    })),
    ...PERFUME_NOTES.map(note => ({ 
      id: `note-${note.toLowerCase()}`, 
      name: note, 
      type: 'note' as const, 
      count: 8 // Mock count 
    })),
    ...PERFUME_TYPES.map(type => ({ 
      id: `type-${type.toLowerCase()}`, 
      name: type, 
      type: 'type' as const, 
      count: 5 // Mock count
    }))
  ];
  
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [addingType, setAddingType] = useState<'gender' | 'note' | 'type' | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };
  
  const handleSaveEdit = (id: string) => {
    if (editName.trim() === '') return;
    
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, name: editName } : cat
    ));
    setEditingId(null);
    setEditName('');
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };
  
  const handleAddCategory = () => {
    if (newCategoryName.trim() === '' || !addingType) return;
    
    const newCategory: Category = {
      id: `${addingType}-${newCategoryName.toLowerCase().replace(/\s+/g, '-')}`,
      name: newCategoryName,
      type: addingType,
      count: 0
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setAddingType(null);
  };
  
  const filteredCategories = (type: 'gender' | 'note' | 'type') => {
    return categories.filter(cat => cat.type === type);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">Categories</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gender Categories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Gender Categories</CardTitle>
                <CardDescription>For whom the perfume is intended</CardDescription>
              </div>
              
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setAddingType('gender')}
              >
                <Plus size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              {addingType === 'gender' && (
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="New category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button size="sm" variant="ghost" onClick={handleAddCategory}>
                    <Check size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setAddingType(null)}>
                    <X size={16} />
                  </Button>
                </div>
              )}
              
              <div className="space-y-2">
                {filteredCategories('gender').map(category => (
                  <div 
                    key={category.id} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                  >
                    {editingId === category.id ? (
                      <div className="flex items-center space-x-2 flex-grow">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8"
                        />
                        <Button size="sm" variant="ghost" onClick={() => handleSaveEdit(category.id)}>
                          <Check size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <span>{category.name}</span>
                          <span className="text-xs text-muted-foreground">({category.count})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(category)}>
                            <Edit size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(category.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Perfume Notes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Perfume Notes</CardTitle>
                <CardDescription>Fragrance characteristics</CardDescription>
              </div>
              
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setAddingType('note')}
              >
                <Plus size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              {addingType === 'note' && (
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="New note name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button size="sm" variant="ghost" onClick={handleAddCategory}>
                    <Check size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setAddingType(null)}>
                    <X size={16} />
                  </Button>
                </div>
              )}
              
              <div className="space-y-2">
                {filteredCategories('note').map(category => (
                  <div 
                    key={category.id} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                  >
                    {editingId === category.id ? (
                      <div className="flex items-center space-x-2 flex-grow">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8"
                        />
                        <Button size="sm" variant="ghost" onClick={() => handleSaveEdit(category.id)}>
                          <Check size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <span>{category.name}</span>
                          <span className="text-xs text-muted-foreground">({category.count})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(category)}>
                            <Edit size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(category.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Perfume Types */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Perfume Types</CardTitle>
                <CardDescription>Product formulations</CardDescription>
              </div>
              
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setAddingType('type')}
              >
                <Plus size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              {addingType === 'type' && (
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="New type name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button size="sm" variant="ghost" onClick={handleAddCategory}>
                    <Check size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setAddingType(null)}>
                    <X size={16} />
                  </Button>
                </div>
              )}
              
              <div className="space-y-2">
                {filteredCategories('type').map(category => (
                  <div 
                    key={category.id} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                  >
                    {editingId === category.id ? (
                      <div className="flex items-center space-x-2 flex-grow">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8"
                        />
                        <Button size="sm" variant="ghost" onClick={() => handleSaveEdit(category.id)}>
                          <Check size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <span>{category.name}</span>
                          <span className="text-xs text-muted-foreground">({category.count})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(category)}>
                            <Edit size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(category.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
