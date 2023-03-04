import { A } from "solid-start";
import Counter from "~/components/Counter";

import { createClient } from "@supabase/supabase-js";
import { createEffect, createSignal, For } from "solid-js";
// import styles from "./App.module.css";
// import logo from "./logo.svg";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY_PUBLIC;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
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
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />

      {/* <p class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p> */}

      {/* {JSON.stringify(supabaseUrl)}
      {JSON.stringify(supabaseKey)} */}
      {JSON.stringify(countries)}

      <ul>
        <For each={products()}>{(product) => <li>{product.title}</li>}</For>
      </ul>

      <ul>
        <For each={countries()}>{(country) => <li>{country.name}</li>}</For>
      </ul>
    </main>
  );
}
