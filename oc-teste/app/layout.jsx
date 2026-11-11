import "./globals.css";

export const metadata = {
  title: "Minhas Tarefas",
  description: "Gerencie suas tarefas de forma simples e eficiente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
