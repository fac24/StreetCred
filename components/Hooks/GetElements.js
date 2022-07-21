import supabase from "../../utils/supabaseClient";

async function GetElements(table, column, criteria) {
  const items = [];
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq(column, criteria);

  data.map((item) => {
    items.push(item);
  });

  return items;
}

export default GetElements;
