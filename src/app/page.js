
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionsHeaders';
export default function Home() {
  return (
<>


<Hero />
<HomeMenu />

<section className="text-center my-16" >

<SectionHeaders 
subHeader={'Our Story'}
mainHeader={'About Us'}
/>
<p className="max-w-2xl mx-auto mt-4 text-gray-500" id="about">
Welcome to Zigi’s Bakery, where every loaf of sourdough bread tells
 a story of love and family.<br/>
It all started in our cozy kitchen in the heart of a small town in 
Germany, where I, Sarah, discovered my passion for baking.<br/>
<br/>
 Inspired by the joy it brought to my husband and our 
 little boy, I began creating loaves filled not just with wholesome
  ingredients but with warmth and care.
What began as a simple gesture to brighten our family’s day quickly
 became a local favorite. Encouraged by my husband and the support of our 
 community, I started sharing my bread with neighbors and friends. 
 Their enthusiastic response encouraged me to turn my love for
  baking into a small business.
Named after the our beloved dog Zigi.<br/>
<br/>
 Zigi is a bakery place where neighbors gather,stories are shared,
  and friendships are made over fresh, delicious bread.
   With each loaf, I strive to capture the essence of home and community,
    ensuring every customer feels the warmth and joy that inspired me to 
    start this journey.<br/>
    <br/>
From our humble beginnings to now, we continue to grow with the same 
commitment to quality and passion for baking that started it all.
 Thank you for being part of our story. Together, we’re spreading love,
  one loaf at a time..
</p>

</section>

<section className="text-center my-8" id="contact">
  <SectionHeaders
  subHeader={'Feel Free'}
  mainHeader={'Contact Us'}
  />
  <div className="mt-6">
   <a className="text-4xl text-gray-500" href="tel:+4915125776172">+49 151 25776172</a>
  </div>
  </section>



</>
   
  )
}
