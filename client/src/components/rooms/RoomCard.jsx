export default function RoomCard({ room, onEdit, onDelete }) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    occupied: 'bg-red-100 text-red-800',
    maintenance: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{room.roomNumber}</h3>
            <p className="text-gray-600 capitalize">{room.type}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[room.status]}`}>
            {room.status}
          </span>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700">${room.price} / night</p>
          {room.description && <p className="text-gray-600 mt-2">{room.description}</p>}
        </div>
        
        {room.amenities && room.amenities.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700">Amenities:</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {room.amenities.map(amenity => (
                <span key={amenity} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onEdit(room)}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(room._id)}
            className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}