import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown, Tag, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default function FilterBar({ filters, onFilterChange, onClearFilters, categories }) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const selectCategory = (category) => {
    updateFilter("category", category);
    setShowCategoryDropdown(false);
  };

  const selectSort = (sortOption) => {
    updateFilter("sortBy", sortOption);
    setShowSortDropdown(false);
  };

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "name-asc", label: "A to Z" },
    { value: "name-desc", label: "Z to A" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  const getSortLabel = (sortValue) => {
    const option = sortOptions.find(opt => opt.value === sortValue);
    return option ? option.label : "Default";
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Mobile toggle button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full flex items-center justify-center px-4 py-2 mb-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4 mr-2" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`${showFilters ? "block" : "hidden"} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search - Takes more space (5 columns) */}
          <div className="md:col-span-5">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 mr-2 text-blue-500" />
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.search || ""}
                onChange={(e) => updateFilter("search", e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
              {filters.search && (
                <button
                  onClick={() => updateFilter("search", "")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category - Medium space (3 columns) */}
          <div className="md:col-span-3 space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Tag className="w-4 h-4 mr-2 text-blue-500" />
              Category
            </label>
            <div className="relative" ref={categoryDropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowCategoryDropdown(!showCategoryDropdown);
                }}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-gray-400 transition-all"
              >
                <span
                  className={`${
                    filters.category ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                >
                  {filters.category || "Select Category"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    showCategoryDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => selectCategory("")}
                      className={`w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors ${
                        !filters.category
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      All Categories
                    </button>
                    {Array.isArray(categories) && categories.length > 0 ? (
                      categories.map((category, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectCategory(category)}
                          className={`w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors ${
                            filters.category === category
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {category}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 italic">
                        No categories available
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sort Filter - Medium space (3 columns) */}
          <div className="md:col-span-3 space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <ArrowUpDown className="w-4 h-4 mr-2 text-blue-500" />
              Sort By
            </label>
            <div className="relative" ref={sortDropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowSortDropdown(!showSortDropdown);
                }}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-gray-400 transition-all"
              >
                <span
                  className={`${
                    filters.sortBy ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                >
                  {getSortLabel(filters.sortBy)}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    showSortDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showSortDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="py-1">
                    {sortOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectSort(option.value)}
                        className={`w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors ${
                          filters.sortBy === option.value
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clear Filters - Compact space (1 column) */}
          <div className="md:col-span-1 flex items-end">
            <button
              onClick={onClearFilters}
              disabled={!filters.search && !filters.category && !filters.sortBy}
              className="w-full h-10 flex items-center justify-center px-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              <X className="w-4 h-4" />
              <span className="hidden lg:inline ml-1">Clear</span>
            </button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(filters.search || filters.category || filters.sortBy) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-600 mr-2">Active:</span>
              
              {filters.search && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  Search: "{filters.search}"
                  <button
                    onClick={() => updateFilter("search", "")}
                    className="ml-2 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {filters.category && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Category: {filters.category}
                  <button
                    onClick={() => updateFilter("category", "")}
                    className="ml-2 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {filters.sortBy && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Sort: {getSortLabel(filters.sortBy)}
                  <button
                    onClick={() => updateFilter("sortBy", "")}
                    className="ml-2 hover:bg-green-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}