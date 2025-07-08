import RoomCard from './RoomCard.jsx';

export default function RoomList({ rooms, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map(room => (
        <RoomCard 
          key={room._id} 
          room={room} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}