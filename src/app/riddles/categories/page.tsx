'use client'
import { Button } from '@/components/ui/button'
import { RiddleArray, RiddleArrayType } from '@/data/riddle'
import { slugify, toTitleCase } from '@/utils/func'
import { 
  Award, 
  Bookmark, 
  Brain, 
  Clock, 
  Filter, 
  Grid, 
  List, 
  Puzzle, 
  Search, 
  SortAsc, 
  Star, 
  TrendingUp 
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type CategoryStats = {
  count: number
  avgDifficulty: number
  trending: boolean
  recentlyAdded: boolean
  featured: boolean
}

type SortOption = 'popular' | 'alphabetical' | 'difficulty' | 'trending'
type ViewMode = 'grid' | 'list'

// Get all categories with statistics
const getAllCategories = (): {categories: string[], categoryStats: Record<string, CategoryStats>} => {
  // Get all keywords, normalize them
  const keywordCounts: Record<string, number> = {};
  const categoryDifficulties: Record<string, number[]> = {};
  const lastAddedDates: Record<string, Date> = {};
  
  // Count occurrences of each keyword and collect riddle lengths for difficulty calculation
  RiddleArray.forEach(riddle => {
    const normalizedKeyword = riddle.keyword.replace(/-/g, ' ');
    
    // Only count keywords with 1-3 words to keep categories manageable
    if (normalizedKeyword.trim().split(/\s+/).length <= 3) {
      if (!keywordCounts[normalizedKeyword]) {
        keywordCounts[normalizedKeyword] = 0;
        categoryDifficulties[normalizedKeyword] = [];
        // Simulate a date for when this category was last updated
        // In a real app, you'd use actual timestamps from your database
        const daysAgo = Math.floor(Math.random() * 60); // Random number of days ago (0-60)
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        lastAddedDates[normalizedKeyword] = date;
      }
      keywordCounts[normalizedKeyword]++;
      categoryDifficulties[normalizedKeyword].push(riddle.riddle.length);
    }
  });
  
  // Convert to array of [keyword, count] pairs
  const keywordPairs = Object.entries(keywordCounts);
  
  // Get all keywords
  const allKeywords = keywordPairs.map(pair => pair[0]);
  
  // Calculate stats for all keywords
  const stats: Record<string, CategoryStats> = {};
  allKeywords.forEach(keyword => {
    // Calculate average difficulty based on riddle length
    const lengths = categoryDifficulties[keyword];
    const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
    const difficulty = Math.min(5, Math.max(1, Math.floor(1 + avgLength / 50)));
    
    // Determine trending status (using consistent hashing for demo)
    const trendingSeed = keyword.charCodeAt(0) + (keyword.charCodeAt(1) || 0);
    const trending = trendingSeed % 10 === 0; // ~10% of categories will be trending
    
    // Determine if recently added (less than 14 days ago)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const recentlyAdded = lastAddedDates[keyword] > twoWeeksAgo;
    
    // Featured categories (for demo, make some categories featured)
    const featuredSeed = keyword.charCodeAt(0) + (keyword.charCodeAt(keyword.length - 1) || 0);
    const featured = featuredSeed % 15 === 0; // ~7% of categories will be featured
    
    stats[keyword] = {
      count: keywordCounts[keyword],
      avgDifficulty: difficulty,
      trending,
      recentlyAdded,
      featured
    };
  });
  
  return {
    categories: allKeywords,
    categoryStats: stats
  };
};

const CategoriesPage = () => {
  // Get all categories and stats at component mount
  const { categories: allCategories, categoryStats } = getAllCategories();
  const [stats] = useState<Record<string, CategoryStats>>(categoryStats);
  const [categories, setCategories] = useState<string[]>(allCategories);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [randomRiddle, setRandomRiddle] = useState<RiddleArrayType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [showRecentOnly, setShowRecentOnly] = useState(false);
  
  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let filteredCategories = [...allCategories];
    
    // Apply search filter
    if (searchQuery) {
      filteredCategories = filteredCategories.filter(category => 
        category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== null) {
      filteredCategories = filteredCategories.filter(category => 
        stats[category].avgDifficulty === difficultyFilter
      );
    }
    
    // Apply featured filter
    if (showFeaturedOnly) {
      filteredCategories = filteredCategories.filter(category => 
        stats[category].featured
      );
    }
    
    // Apply trending filter
    if (showTrendingOnly) {
      filteredCategories = filteredCategories.filter(category => 
        stats[category].trending
      );
    }
    
    // Apply recent filter
    if (showRecentOnly) {
      filteredCategories = filteredCategories.filter(category => 
        stats[category].recentlyAdded
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'popular':
        filteredCategories.sort((a, b) => stats[b].count - stats[a].count);
        break;
      case 'alphabetical':
        filteredCategories.sort((a, b) => a.localeCompare(b));
        break;
      case 'difficulty':
        filteredCategories.sort((a, b) => stats[b].avgDifficulty - stats[a].avgDifficulty);
        break;
      case 'trending':
        filteredCategories.sort((a, b) => {
          // Sort by trending status first
          if (stats[a].trending !== stats[b].trending) {
            return stats[b].trending ? 1 : -1;
          }
          // Then by popularity
          return stats[b].count - stats[a].count;
        });
        break;
    }
    
    setCategories(filteredCategories);
  }, [
    allCategories, 
    searchQuery, 
    sortOption, 
    difficultyFilter, 
    showFeaturedOnly, 
    showTrendingOnly, 
    showRecentOnly
  ]);
  
  const getDifficultyColor = (difficulty: number) => {
    switch(difficulty) {
      case 1: return 'bg-green-200 text-green-800';
      case 2: return 'bg-emerald-200 text-emerald-800';
      case 3: return 'bg-yellow-200 text-yellow-800';
      case 4: return 'bg-orange-200 text-orange-800';
      case 5: return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  const handleCategoryClick = (category: string) => {
    // Reset answer visibility when changing categories
    setShowAnswer(false);
    
    if (activeCategory === category) {
      setActiveCategory(null);
      setRandomRiddle(null);
      return;
    }
    
    setActiveCategory(category);
    setIsLoading(true);
    
    // Find riddles in this category
    const riddlesInCategory = RiddleArray.filter(riddle => 
      riddle.keyword.replace(/-/g, ' ') === category
    );
    
    // Select a random riddle
    if (riddlesInCategory.length > 0) {
      const randomIndex = Math.floor(Math.random() * riddlesInCategory.length);
      // Short timeout to show loading state
      setTimeout(() => {
        setRandomRiddle(riddlesInCategory[randomIndex]);
        setIsLoading(false);
      }, 300);
    } else {
      setRandomRiddle(null);
      setIsLoading(false);
    }
  };

  const getAnotherRiddle = () => {
    if (!activeCategory) return;
    
    setIsLoading(true);
    setShowAnswer(false);
    
    const riddlesInCategory = RiddleArray.filter(
      riddle => riddle.keyword.replace(/-/g, ' ') === activeCategory
    );
    
    if (riddlesInCategory.length > 0) {
      let newRiddle;
      
      // Try to get a different riddle than the current one
      if (riddlesInCategory.length > 1 && randomRiddle) {
        const filteredRiddles = riddlesInCategory.filter(r => r.id !== randomRiddle.id);
        const randomIndex = Math.floor(Math.random() * filteredRiddles.length);
        newRiddle = filteredRiddles[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * riddlesInCategory.length);
        newRiddle = riddlesInCategory[randomIndex];
      }
      
      setTimeout(() => {
        setRandomRiddle(newRiddle);
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSortOption('popular');
    setDifficultyFilter(null);
    setShowFeaturedOnly(false);
    setShowTrendingOnly(false);
    setShowRecentOnly(false);
  };
  
  // Calculate category breakdown by difficulty
  const difficultyBreakdown = [1, 2, 3, 4, 5].map(level => {
    const count = allCategories.filter(cat => stats[cat].avgDifficulty === level).length;
    return { level, count };
  });

  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C3144] mb-2">Riddle Categories</h1>
        <p className="text-gray-600 max-w-3xl">
          Explore our extensive collection of riddles organized by categories. Find your favorite type of brain teasers, or discover new challenging puzzles to solve.
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="p-4 bg-[#FEFAE8] border-2 border-black rounded-lg shadow-[2px_2px_0_0_#163300]">
          <div className="flex items-center mb-1">
            <Puzzle size={16} className="mr-2 text-purple-600" />
            <h3 className="font-bold text-sm">Total Categories</h3>
          </div>
          <p className="text-2xl font-bold">{allCategories.length}</p>
        </div>
        
        <div className="p-4 bg-[#FEFAE8] border-2 border-black rounded-lg shadow-[2px_2px_0_0_#163300]">
          <div className="flex items-center mb-1">
            <Brain size={16} className="mr-2 text-purple-600" />
            <h3 className="font-bold text-sm">Total Riddles</h3>
          </div>
          <p className="text-2xl font-bold">{RiddleArray.length}</p>
        </div>
        
        <div className="p-4 bg-[#FEFAE8] border-2 border-black rounded-lg shadow-[2px_2px_0_0_#163300]">
          <div className="flex items-center mb-1">
            <TrendingUp size={16} className="mr-2 text-purple-600" />
            <h3 className="font-bold text-sm">Trending Categories</h3>
          </div>
          <p className="text-2xl font-bold">
            {allCategories.filter(cat => stats[cat].trending).length}
          </p>
        </div>
        
        <div className="p-4 bg-[#FEFAE8] border-2 border-black rounded-lg shadow-[2px_2px_0_0_#163300]">
          <div className="flex items-center mb-1">
            <Clock size={16} className="mr-2 text-purple-600" />
            <h3 className="font-bold text-sm">Recently Added</h3>
          </div>
          <p className="text-2xl font-bold">
            {allCategories.filter(cat => stats[cat].recentlyAdded).length}
          </p>
        </div>
        
        <div className="p-4 bg-[#FEFAE8] border-2 border-black rounded-lg shadow-[2px_2px_0_0_#163300]">
          <div className="flex items-center mb-1">
            <Star size={16} className="mr-2 text-purple-600" />
            <h3 className="font-bold text-sm">Featured</h3>
          </div>
          <p className="text-2xl font-bold">
            {allCategories.filter(cat => stats[cat].featured).length}
          </p>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6 p-4 border-2 border-black bg-[#FEFAE8] rounded-lg shadow-[4px_4px_0_0_#163300]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full p-2 border-2 border-black rounded-md shadow-[2px_2px_0_0_#163300] focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border-2 border-black rounded-md overflow-hidden shadow-[2px_2px_0_0_#163300]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#FFC107]' : 'bg-white'}`}
                aria-label="Grid view"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#FFC107]' : 'bg-white'}`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
            
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="p-2 border-2 border-black rounded-md shadow-[2px_2px_0_0_#163300] bg-white"
            >
              <option value="popular">Sort by Popular</option>
              <option value="alphabetical">Sort A-Z</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="trending">Sort by Trending</option>
            </select>
            
            <button
              onClick={() => resetFilters()}
              className="p-2 border-2 border-black rounded-md shadow-[2px_2px_0_0_#163300] bg-white hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <h4 className="text-sm font-semibold mr-2 flex items-center">
            <Filter size={14} className="mr-1" /> Filters:
          </h4>
          
          {/* Difficulty level filters */}
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setDifficultyFilter(difficultyFilter === level ? null : level)}
              className={`text-xs px-2 py-1 rounded-md border 
                ${difficultyFilter === level 
                  ? 'bg-purple-600 text-white border-purple-700' 
                  : `${getDifficultyColor(level)} border-transparent`}`}
            >
              <span className="flex items-center">
                <Brain size={10} className="mr-1" />
                Level {level} <span className="ml-1 opacity-75">({difficultyBreakdown[level-1].count})</span>
              </span>
            </button>
          ))}
          
          {/* Special filters */}
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`text-xs px-2 py-1 rounded-md border flex items-center
              ${showFeaturedOnly 
                ? 'bg-purple-600 text-white border-purple-700' 
                : 'bg-white border-gray-300'}`}
          >
            <Star size={10} className="mr-1" />
            Featured
          </button>
          
          <button
            onClick={() => setShowTrendingOnly(!showTrendingOnly)}
            className={`text-xs px-2 py-1 rounded-md border flex items-center
              ${showTrendingOnly 
                ? 'bg-purple-600 text-white border-purple-700' 
                : 'bg-white border-gray-300'}`}
          >
            <TrendingUp size={10} className="mr-1" />
            Trending
          </button>
          
          <button
            onClick={() => setShowRecentOnly(!showRecentOnly)}
            className={`text-xs px-2 py-1 rounded-md border flex items-center
              ${showRecentOnly 
                ? 'bg-purple-600 text-white border-purple-700' 
                : 'bg-white border-gray-300'}`}
          >
            <Clock size={10} className="mr-1" />
            Recently Added
          </button>
        </div>
      </div>
      
      {/* Results count and info */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {categories.length} of {allCategories.length} categories
        </p>
        <p className="text-xs text-gray-500 flex items-center">
          <Clock size={12} className="mr-1" /> 
          Updated daily
        </p>
      </div>
      
      {/* Category cards */}
      {categories.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mb-8">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`p-4 border-2 border-black rounded-lg cursor-pointer hover:bg-[#FEFAE8] transition duration-150 ${
                  activeCategory === category 
                    ? 'bg-[#FFC107] shadow-[2px_2px_0_0_#163300]' 
                    : 'bg-white shadow-[1px_1px_0_0_#163300]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{toTitleCase(category)}</h3>
                  <div className="flex flex-col gap-1">
                    {stats[category]?.trending && (
                      <span className="flex items-center text-xs bg-purple-100 text-purple-800 px-1 rounded">
                        <TrendingUp size={10} className="mr-0.5" /> Hot
                      </span>
                    )}
                    {stats[category]?.recentlyAdded && (
                      <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-1 rounded">
                        <Clock size={10} className="mr-0.5" /> New
                      </span>
                    )}
                    {stats[category]?.featured && (
                      <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                        <Star size={10} className="mr-0.5" /> Featured
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{stats[category]?.count || 0} riddles</span>
                  
                  <span className={`px-2 py-1 rounded text-xs flex items-center ${
                    getDifficultyColor(stats[category]?.avgDifficulty || 3)
                  }`}>
                    <Brain size={10} className="mr-1" />
                    Difficulty {stats[category]?.avgDifficulty || 3}
                  </span>
                </div>
                
                <Button
                  asChild
                  className="w-full mt-3 shadow-[2px_2px_0_0_#163300] border-2 border-black text-sm text-black
                    bg-white hover:bg-[#FFC107] hover:text-white"
                >
                  <Link href={`/${slugify(category)}`}>
                    View All Riddles
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-black rounded-lg overflow-hidden mb-8 shadow-[4px_4px_0_0_#163300]">
            <table className="w-full">
              <thead className="bg-[#FEFAE8] border-b-2 border-black">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Category</th>
                  <th className="px-4 py-3 text-center font-bold">Riddles</th>
                  <th className="px-4 py-3 text-center font-bold">Difficulty</th>
                  <th className="px-4 py-3 text-center font-bold">Tags</th>
                  <th className="px-4 py-3 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-[#1C3144]">
                      <span className="cursor-pointer hover:text-purple-600" 
                        onClick={() => handleCategoryClick(category)}>
                        {toTitleCase(category)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {stats[category]?.count || 0}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <span className={`px-2 py-1 rounded text-xs flex items-center ${
                          getDifficultyColor(stats[category]?.avgDifficulty || 3)
                        }`}>
                          <Brain size={10} className="mr-1" />
                          Level {stats[category]?.avgDifficulty || 3}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-1">
                        {stats[category]?.trending && (
                          <span className="text-xs bg-purple-100 text-purple-800 px-1 rounded">
                            Hot
                          </span>
                        )}
                        {stats[category]?.recentlyAdded && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
                            New
                          </span>
                        )}
                        {stats[category]?.featured && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        asChild
                        size="sm"
                        className="shadow-[1px_1px_0_0_#163300] border border-black text-xs text-black
                          bg-white hover:bg-[#FFC107] hover:text-white"
                      >
                        <Link href={`/${slugify(category)}`}>
                          View
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Puzzle size={48} className="text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No categories found</h3>
          <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search query</p>
          <Button onClick={resetFilters} variant="outline">
            Reset All Filters
          </Button>
        </div>
      )}
      
      {/* Category preview panel */}
      {activeCategory && (
        <div className="border-2 border-black rounded-lg p-4 bg-white mb-8 shadow-[4px_4px_0_0_#163300]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg flex items-center">
              <Puzzle size={20} className="mr-2 text-purple-600" />
              {toTitleCase(activeCategory)} Preview
            </h3>
            <Button
              asChild
              className="shadow-[2px_2px_0_0_#163300] border-2 border-black text-sm bg-[#FFC107] hover:bg-[#333333] hover:text-white"
            >
              <Link href={`/${slugify(activeCategory)}`}>
                View All {stats[activeCategory]?.count || 0} Riddles
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              {isLoading ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              ) : randomRiddle ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="font-medium mb-2 text-gray-700">Riddle</h4>
                    <div className="font-medium">{randomRiddle.riddle}</div>
                  </div>
                  <div 
                    className="relative overflow-hidden cursor-pointer border border-gray-200 rounded-md"
                    onClick={() => setShowAnswer(prev => !prev)}
                  >
                    <div className={`bg-gray-50 p-4 ${showAnswer ? '' : 'blur-md'}`}>
                      <h4 className="font-medium mb-2 text-gray-700">Answer</h4>
                      <div className="italic">
                        {randomRiddle.answer}
                      </div>
                    </div>
                    {!showAnswer && (
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-600 pointer-events-none">
                        <span className="bg-white px-3 py-2 rounded shadow-sm">Tap to reveal answer</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center text-sm text-gray-500">
                  No riddles available in this category
                </div>
              )}
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs border border-gray-300 hover:bg-gray-50"
                    onClick={() => {
                      setActiveCategory(null);
                      setRandomRiddle(null);
                    }}
                  >
                    Close
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs border border-gray-300 hover:bg-gray-50"
                    onClick={getAnotherRiddle}
                    disabled={!activeCategory || stats[activeCategory]?.count <= 1}
                  >
                    Another Riddle
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                  aria-label="Save this riddle"
                >
                  <Bookmark size={14} className="mr-1" /> Save
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4">
              <h4 className="font-medium mb-3 flex items-center">
                <Brain size={16} className="text-purple-600 mr-2" />
                Category Information
              </h4>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Riddles:</span>
                  <span className="font-semibold">{stats[activeCategory]?.count || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Difficulty:</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    getDifficultyColor(stats[activeCategory]?.avgDifficulty || 3)
                  }`}>
                    Level {stats[activeCategory]?.avgDifficulty || 3}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  <div className="flex gap-1">
                    {stats[activeCategory]?.trending && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-1 rounded flex items-center">
                        <TrendingUp size={10} className="mr-0.5" /> Trending
                      </span>
                    )}
                    {stats[activeCategory]?.recentlyAdded && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded flex items-center">
                        <Clock size={10} className="mr-0.5" /> New
                      </span>
                    )}
                    {stats[activeCategory]?.featured && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded flex items-center">
                        <Star size={10} className="mr-0.5" /> Featured
                      </span>
                    )}
                    {!stats[activeCategory]?.trending && !stats[activeCategory]?.recentlyAdded && !stats[activeCategory]?.featured && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-1 rounded">
                        Standard
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Related categories - simulate some related categories based on first letter */}
              <h4 className="font-medium mb-2 flex items-center">
                <Puzzle size={16} className="text-purple-600 mr-2" />
                Related Categories
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {categories
                  .filter(cat => 
                    cat !== activeCategory && 
                    (cat[0] === activeCategory[0] || 
                     cat.includes(activeCategory.split(' ')[0]) ||
                     activeCategory.includes(cat.split(' ')[0]))
                  )
                  .slice(0, 5)
                  .map(relatedCat => (
                    <Link
                      key={relatedCat}
                      href={`/${slugify(relatedCat)}`}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                    >
                      {toTitleCase(relatedCat)}
                    </Link>
                  ))}
                
                {categories
                  .filter(cat => 
                    cat !== activeCategory && 
                    (cat[0] === activeCategory[0] || 
                     cat.includes(activeCategory.split(' ')[0]) ||
                     activeCategory.includes(cat.split(' ')[0]))
                  ).length === 0 && (
                    <span className="text-xs text-gray-500">No related categories found</span>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Category Groups - grouping categories by difficulty level */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#1C3144] mb-4 flex items-center">
          <Brain className="text-purple-600 mr-2" size={22} />
          Categories by Difficulty Level
        </h2>
        
        <div className="grid grid-cols-1  gap-4">
          {[1, 2, 3, 4, 5].map(level => (
            <div 
              key={level}
              className="border-2 border-black bg-white rounded-lg shadow-[2px_2px_0_0_#163300] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-bold flex items-center ${
                  level === 1 ? 'text-green-800' :
                  level === 2 ? 'text-emerald-800' :
                  level === 3 ? 'text-yellow-800' :
                  level === 4 ? 'text-orange-800' :
                  'text-red-800'
                }`}>
                  <Brain size={16} className="mr-1" />
                  Level {level}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded ${getDifficultyColor(level)}`}>
                  {difficultyBreakdown[level-1].count} categories
                </span>
              </div>
              
              <div className="space-y-1 mb-3">
                {allCategories
                  .filter(cat => stats[cat].avgDifficulty === level)
                  .sort((a, b) => stats[b].count - stats[a].count)
                  .slice(0, 5)
                  .map(cat => (
                    <div key={cat} className="text-sm flex justify-between items-center">
                      <Link 
                        href={`/${slugify(cat)}`}
                        className="hover:text-purple-600 hover:underline"
                      >
                        {toTitleCase(cat)}
                      </Link>
                      <span className="text-xs text-gray-500">{stats[cat].count}</span>
                    </div>
                  ))}
              </div>
              
              <Button
                onClick={() => setDifficultyFilter(level)}
                variant="outline"
                size="sm"
                className="w-full text-xs"
              >
                View All Level {level}
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Categories */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#1C3144] mb-4 flex items-center">
          <Star className="text-purple-600 mr-2" size={22} />
          Featured Categories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          {allCategories
            .filter(cat => stats[cat].featured)
            .sort((a, b) => stats[b].count - stats[a].count)
            .slice(0, 3)
            .map(category => (
              <div
                key={category}
                className="p-4 border-2 border-black rounded-lg bg-[#FEFAE8] shadow-[2px_2px_0_0_#163300]"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{toTitleCase(category)}</h3>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                      <Star size={10} className="mr-0.5" /> Featured
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">{stats[category]?.count || 0} riddles</span>
                  
                  <span className={`px-2 py-1 rounded text-xs flex items-center ${
                    getDifficultyColor(stats[category]?.avgDifficulty || 3)
                  }`}>
                    <Brain size={10} className="mr-1" />
                    Difficulty {stats[category]?.avgDifficulty || 3}
                  </span>
                </div>
                
                {/* Preview of one riddle */}
                <div className="bg-white p-3 border border-gray-200 rounded-md mb-3 text-sm">
                  {RiddleArray
                    .filter(riddle => riddle.keyword.replace(/-/g, ' ') === category)
                    .slice(0, 1)
                    .map(riddle => (
                      <div key={riddle.id}>
                        <p className="italic">"{riddle.riddle.slice(0, 100)}..."</p>
                      </div>
                    ))}
                </div>
                
                <Button
                  asChild
                  className="w-full shadow-[2px_2px_0_0_#163300] border-2 border-black text-sm 
                    bg-[#FFC107] hover:bg-[#E5AC06]"
                >
                  <Link href={`/${slugify(category)}`}>
                    Explore {toTitleCase(category)} Riddles
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
      
      {/* Call to action */}
      <div className="bg-[#FEFAE8] border-2 border-black shadow-[4px_4px_0_0_#163300] rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
        <p className="mb-4 text-gray-700">
          We're constantly adding new riddles and categories! Let us know what you'd like to see next.
        </p>
        <div className="flex justify-center gap-4">
        <a href="https://x.com/emannsunday" target="_blank" rel="noopener noreferrer">
  <Button
    className="shadow-[2px_2px_0_0_#163300] border-2 border-black bg-[#FFC107] hover:bg-[#E5AC06]"
  >
    Submit a Riddle
  </Button>
</a>

<a href="mailto:ebubesunday16@gmail.com">
  <Button
    variant="outline"
    className="shadow-[2px_2px_0_0_#163300] border-2 border-black"
  >
    Request a Category
  </Button>
</a>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage