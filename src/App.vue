<script setup>
import { onMounted } from 'vue'
import BrandLogo from './components/BrandLogo.vue'
import ContactCard from './components/ContactCard.vue'
import SupportIcon from './components/SupportIcon.vue'
import cloudMascot from './assets/joycards-cloud.png'
import { resolveStore } from './config/stores'

const store = resolveStore(globalThis.location?.hostname)

const heroBenefits = [
  { icon: 'clock', title: 'Быстро', text: '5–15 минут' },
  { icon: 'chat', title: 'Каждый день', text: 'Без выходных' },
  { icon: 'lock', title: 'Безопасно', text: 'Не просим пароли' },
]

onMounted(() => {
  // Синхронизирует данные вкладки с магазином, выбранным по текущему домену.
  document.title = store.pageTitle
  document.querySelector('meta[name="description"]')?.setAttribute('content', store.description)
})
</script>

<template>
  <div class="site-shell">
    <div class="ambient ambient--one"></div>
    <div class="ambient ambient--two"></div>

    <header class="site-header wrap">
      <a class="brand-link" href="#top" :aria-label="`${store.name}: наверх`">
        <BrandLogo />
      </a>
    </header>

    <main id="top" class="wrap">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__spark hero__spark--orange" aria-hidden="true">✦</div>
        <div class="hero__spark hero__spark--violet" aria-hidden="true">•</div>
        <div class="hero__spark hero__spark--blue" aria-hidden="true">•</div>

        <div class="hero__copy">
          <p class="availability"><span></span>{{ store.eyebrow }}</p>
          <h1 id="hero-title">Нужна <em>помощь?</em></h1>
          <p class="hero__description">{{ store.description }}</p>

          <div class="hero-benefits" aria-label="Преимущества поддержки">
            <article v-for="benefit in heroBenefits" :key="benefit.title" class="hero-benefit">
              <SupportIcon :name="benefit.icon" />
              <div>
                <strong>{{ benefit.title }}</strong>
                <span>{{ benefit.text }}</span>
              </div>
            </article>
          </div>
        </div>

        <div class="hero__visual" aria-hidden="true">
          <div class="hero__halo"></div>
          <img :src="cloudMascot" alt="" />
        </div>
      </section>

      <section id="support" class="support-section" aria-labelledby="support-title">
        <div class="section-title-row">
          <span></span>
          <h2 id="support-title">Свяжитесь с нами <em>удобным для вас способом</em></h2>
          <span></span>
        </div>

        <div id="contacts" class="contact-grid">
          <ContactCard
            v-for="(contact, index) in store.contacts"
            :key="contact.code"
            :contact="contact"
            :style="{ '--delay': `${index * 90 + 180}ms` }"
          />
        </div>
      </section>

      <section class="trust-strip" aria-label="Условия поддержки">
        <article>
          <SupportIcon name="clock" />
          <div><strong>Время работы</strong><span>{{ store.schedule }}</span></div>
        </article>
        <article>
          <SupportIcon name="chat" />
          <div><strong>Среднее время ответа</strong><span>{{ store.responseTime }}</span></div>
        </article>
        <article>
          <SupportIcon name="shield" />
          <div><strong>Ваши данные в безопасности</strong><span>Не запрашиваем пароли и личные данные</span></div>
        </article>
        <article>
          <SupportIcon name="heart" />
          <div><strong>Мы ценим каждого клиента</strong><span>Спасибо, что выбираете {{ store.name }}</span></div>
        </article>
      </section>
    </main>

    <footer class="site-footer wrap">
      <BrandLogo compact />
      <p>Поддержка цифрового магазина {{ store.name }}</p>
      <span>© {{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>
