type ProfileProps = {
  greeting: string;
};

function Profile({ greeting }: ProfileProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-left text-xl font-bold">{greeting}</p>
      </div>
    </div>
  );
}

export default Profile;
