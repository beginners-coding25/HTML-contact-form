import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
};

export default Index;
