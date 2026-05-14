import View_and_update_emp from "./view_update";

export default async function testing({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
  return (
    <View_and_update_emp id = {id}/>
   
  );
}