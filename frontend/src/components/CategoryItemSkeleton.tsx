function CategoryItemSkeleton() {
  return [...Array(6)].map((_, index) => (
    <div
      key={index}
      className="flex items-center space-x-2 p-2 mx-1 my-1 h-8 rounded-sm animate-pulse"
    >
      <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
      <div className="h-3 w-20 bg-muted-foreground/30 rounded" />
    </div>
  ))
}

export default CategoryItemSkeleton
