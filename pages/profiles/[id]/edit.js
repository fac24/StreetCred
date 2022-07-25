import UserPhotoUpload from "../../../components/UserProfile/UserPhotoUpload";
function Edit() {
  const user_id = "1404399e-b9a8-48af-b4bf-1279264a2564";
  return (
    <section>
      <h1 className="margin-top">edit</h1>
      <UserPhotoUpload user_id={user_id} />
    </section>
  );
}

export default Edit;
