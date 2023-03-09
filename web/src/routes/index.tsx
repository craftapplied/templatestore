import { Component, createEffect, createSignal, For } from "solid-js";
import { A } from "solid-start";
import { AuthSession } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";

import Counter from "~/components/Counter";

// import styles from "./App.module.css";
// import logo from "./logo.svg";
import SignIn from "./signin";
import Account from "~/components/Account";

interface Product {
  title: string;
}

export default function Home() {
  const [session, setSession] = createSignal<AuthSession | null>(null);

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });

  // const [products, setProducts] = createSignal<Product[]>([]);

  // createEffect(() => {
  //   getProducts();
  // });

  // async function getProducts() {
  //   const { data } = await supabase.from("products").select("*");
  //   setProducts(data as Product[]);
  // }

  return (
    <>
      <div class="container" style={{ padding: "50px 0 100px 0" }}>
        {!session() ? <SignIn /> : <Account session={session()!} />}
      </div>

      {/* <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
          Template Store
        </h1>

        <Counter />

        <ul>
          <For each={products()} fallback={<div>No items</div>}>
            {(item) => <li>{item.title}</li>}
          </For>
        </ul>
      </main> */}
    </>
  );
}
