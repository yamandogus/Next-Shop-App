export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className={"text-2xl font-bold text-center mb-8"}>Hakkımızda</h1>

      <div className="text-left space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Biz Kimiz?</h2>
          <p className="text-lg mb-4">
            NextShop, 2023 yılında kurulmuş bir online alışveriş platformudur. Müşterilerimize basit
            ve güvenilir bir alışveriş deneyimi sunmayı hedefliyoruz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Ödeme Seçeneklerimiz</h2>
          <p className="text-lg mb-4">Sitemizde aşağıdaki ödeme yöntemlerini kullanabilirsiniz:</p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Kredi Kartı / Banka Kartı</li>
            <li>Kapıda Kredi Kartı</li>
            <li>Kapıda Ödeme</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kargo ve Teslimat</h2>
          <p className="text-lg mb-4">
            Siparişleriniz genellikle 1-3 iş günü içerisinde kargoya verilmektedir. 200 TL üzeri
            alışverişlerde kargo ücretsizdir.
          </p>
          <p className="text-lg">Çalıştığımız kargo firması: Aras Kargo</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">İade ve Değişim</h2>
          <p className="text-lg mb-4">
            Ürünlerimizi 14 gün içerisinde iade edebilirsiniz. İade işlemleriniz en geç 5 iş günü
            içerisinde tamamlanmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">İletişim</h2>
          <p className="text-lg">
            E-posta: <strong>info@nextshop.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
