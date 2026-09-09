import React, { useState } from 'react';
import {
  Palette,
  MapPin,
  Home,
  Package,
  Shirt,
  Scissors,
  Camera,
  Sun,
  Volume2,
  Compass,
  Film,
  Sparkles,
  Sliders,
  Plus,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Project, Role, ProductionDesignItem } from '../../types';
import { INITIAL_PRODUCTION_DESIGN_ITEMS } from '../../data/suiteSampleData';

interface ProductionDesignViewProps {
  project: Project;
  onNavigateTab: (tab: any) => void;
  activeRole: Role;
}

export const ProductionDesignView: React.FC<ProductionDesignViewProps> = ({
  project,
  onNavigateTab,
  activeRole,
}) => {
  const [activeCategory, setActiveCategory] = useState<'pre-production' | 'production' | 'post-production'>('pre-production');
  const [items, setItems] = useState<ProductionDesignItem[]>(INITIAL_PRODUCTION_DESIGN_ITEMS);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemSubCategory, setNewItemSubCategory] = useState('Locations');
  const [newItemDept, setNewItemDept] = useState('Art Department');
  const [newItemLead, setNewItemLead] = useState('Lead Designer');
  const [newItemNotes, setNewItemNotes] = useState('');

  const subCategoriesByCategory = {
    'pre-production': ['Locations', 'Sets', 'Props', 'Costumes', 'Makeup'],
    production: ['Camera', 'Lighting', 'Sound', 'Direction'],
    'post-production': ['Editing', 'VFX', 'SFX', 'Color grading', 'Sound mixing'],
  };

  const currentSubCategories = subCategoriesByCategory[activeCategory];

  const filteredItems = items.filter((item) => {
    if (item.category !== activeCategory) return false;
    if (selectedSubCategory !== 'All' && item.subCategory !== selectedSubCategory) return false;
    return true;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: ProductionDesignItem = {
      id: `pd_${Date.now()}`,
      category: activeCategory,
      subCategory: newItemSubCategory,
      name: newItemName.trim(),
      department: newItemDept,
      assignedLead: newItemLead,
      status: 'In Progress',
      notes: newItemNotes.trim() || 'Newly planned production element.',
    };
    setItems([newItem, ...items]);
    setNewItemName('');
    setNewItemNotes('');
    setIsAddingItem(false);
  };

  const handleToggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const nextStatus = it.status === 'Ready' ? 'In Progress' : 'Ready';
        return { ...it, status: nextStatus };
      })
    );
  };

  const getSubCategoryIcon = (sub: string) => {
    switch (sub) {
      case 'Locations':
        return <MapPin className="w-4 h-4" />;
      case 'Sets':
        return <Home className="w-4 h-4" />;
      case 'Props':
        return <Package className="w-4 h-4" />;
      case 'Costumes':
        return <Shirt className="w-4 h-4" />;
      case 'Makeup':
        return <Scissors className="w-4 h-4" />;
      case 'Camera':
        return <Camera className="w-4 h-4" />;
      case 'Lighting':
        return <Sun className="w-4 h-4" />;
      case 'Sound':
      case 'Sound mixing':
      case 'SFX':
        return <Volume2 className="w-4 h-4" />;
      case 'Direction':
        return <Compass className="w-4 h-4" />;
      case 'Editing':
        return <Film className="w-4 h-4" />;
      case 'VFX':
        return <Sparkles className="w-4 h-4" />;
      case 'Color grading':
        return <Sliders className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6fb] text-slate-800 p-6 sm:p-8 lg:p-10 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Production Design</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Organize visual assets, camera rigs, set dressing, and post-production design pipeline
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingItem(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
            <button
              onClick={() => onNavigateTab('pre-prod-board')}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
            >
              <span>Pre-production Board →</span>
            </button>
          </div>
        </div>

        {/* 3 Main Phase Buttons (Pre-production • Production • Post-production) */}
        <div className="grid grid-cols-3 gap-2 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs text-xs font-medium">
          {(
            [
              { id: 'pre-production', label: '1. Pre-Production Design' },
              { id: 'production', label: '2. Production Setup' },
              { id: 'post-production', label: '3. Post-Production Plan' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSubCategory('All');
              }}
              className={`py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Sub-Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSubCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              selectedSubCategory === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Categories ({items.filter((i) => i.category === activeCategory).length})
          </button>
          {currentSubCategories.map((sub) => {
            const count = items.filter((i) => i.category === activeCategory && i.subCategory === sub).length;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedSubCategory === sub
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{sub}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Add Modal / Form */}
        {isAddingItem && (
          <form
            onSubmit={handleAddItem}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Add Design Item to {activeCategory.toUpperCase()}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingItem(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subcategory</label>
                <select
                  value={newItemSubCategory}
                  onChange={(e) => setNewItemSubCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                >
                  {currentSubCategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Item / Asset Name</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Sony FX6 Cinema Rig, Classroom Blackboard Prop"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Specifications & Notes</label>
              <textarea
                value={newItemNotes}
                onChange={(e) => setNewItemNotes(e.target.value)}
                rows={2}
                placeholder="Include reference notes, color palettes, or technical requirements..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingItem(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
              >
                Save Design Item
              </button>
            </div>
          </form>
        )}

        {/* Grid of Design Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isReady = item.status === 'Ready';
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                      {getSubCategoryIcon(item.subCategory)}
                      <span>{item.subCategory}</span>
                    </span>

                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                        isReady
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.status}</span>
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Lead: {item.assignedLead}</span>
                  <span className="text-slate-500 font-medium">{item.department}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
