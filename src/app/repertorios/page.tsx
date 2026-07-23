import Header from "@/components/common/header";

export default function Repertorios() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <main className="relative z-10 h-full overflow-hidden">
        <Header />
        <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="text-center space-y-2 fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Lista dos Repertórios
            </h1>
            <p className="text-muted-foreground">
              Aqui vai aparecer a lista dos repertórios que encontrar la
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
