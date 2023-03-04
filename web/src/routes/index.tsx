import { A } from "solid-start";
import Counter from "~/components/Counter";

import { createClient } from "@supabase/supabase-js";
import { createEffect, createSignal, For } from "solid-js";
// import styles from "./App.module.css";
// import logo from "./logo.svg";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY_PUBLIC;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Product {
  title: string;
}

export default function Home() {
  const [products, setProducts] = createSignal<Product[]>([]);

  createEffect(() => {
    getProducts();
  });

  async function getProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data as Product[]);
  }

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Template Store
      </h1>

      <Counter />

      <ul>
        <For each={products()} fallback={<div>No items</div>}>
          {(item) => <li>{item.title}</li>}
        </For>
      </ul>
    </main>
  );
}
