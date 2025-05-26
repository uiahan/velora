import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://yxjbupfohapyzctfymbw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4amJ1cGZvaGFweXpjdGZ5bWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMjUxNDgsImV4cCI6MjA2MzgwMTE0OH0.BGHLDQ1WGmqbpgSoC8NHf3CjtaT-X1CynORA0aQvD3U";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("quote-form");
const container = document.getElementById("quotes-container");

async function fetchQuotes() {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    container.innerHTML = "Gagal memuat quotes.";
    console.error(error);
    return;
  }

  container.innerHTML = "";
  data.forEach((q) => {
    const div = document.createElement("div");
    div.className =
      "p-4 shadow-lg rounded-lg g-white/30 backdrop-blur-2xl bg-transparent flex flex-col justify-between h-full";

    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-duration", "1300");

    div.innerHTML = `
            <div>
                <h1 class="font-semibold text-white text-2xl">
                    ${q.author}
                </h1>
                <p class="mt-1 text-white font-medium line-clamp-7">${
                  q.content
                }</p>
            </div>
            <p class="mt-3 font-semibold text-white text-end text-sm">
                ${new Date(q.created_at).toLocaleDateString("id-ID")}
            </p>
          `;
    container.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const author = document.getElementById("author").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!author || !content) {
    alert("Isi semua kolom!");
    return;
  }

  const { error } = await supabase.from("quotes").insert([{ author, content }]);

  if (error) {
    alert("Gagal mengirim quote.");
    console.error(error);
    return;
  }

  form.reset();
  document.getElementById("modal").classList.add("hidden");
  fetchQuotes();
});

fetchQuotes();
