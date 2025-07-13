export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Hotel Management System</h3>
            <p className="text-gray-400 text-sm">Streamlining hotel operations</p>
          </div>
          
        </div>
        
        <div className="mt-4 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Hotel Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}