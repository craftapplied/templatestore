import { createClient } from "@supabase/supabase-js";
import { createEffect, createSignal, For } from "solid-js";
import styles from "./App.module.css";
import logo from "./logo.svg";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY_PUBLIC;

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [products, setProducts] = createSignal();

  createEffect(() => {
    getProducts();
  });

  async function getProducts() {
    const { data } = await supabase.from("products").select();
    setProducts(data);
  }

  const [countries, setCountries] = createSignal();

  createEffect(() => {
    getCountries();
  });

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <div class={styles.App}>
      <main>
        <ul>
          <For each={products()}>{(product) => <li>{product.title}</li>}</For>
        </ul>

        <ul>
          <For each={countries()}>{(country) => <li>{country.name}</li>}</For>
        </ul>
      </main>
    </div>
  );
}

export default App;
