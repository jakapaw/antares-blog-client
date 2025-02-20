'use client';

import FooterPrimary from "@/components/FooterPrimary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TempImage from "../../../public/blue-ridge-2.jpg";
import TempProfile from "../../../public/profile-1.jpg";
import HeaderSecondary from "./HeaderSecondary";

export default function ArticlePage() {
  return (
    <>
      <HeaderSecondary />
      <main className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-semibold">Magnis mauris praesent ex dignissim risus</h1>
        <div className="text-xs">
          <Image src={TempImage} alt="Article Banner" className="w-full mb-2" />
          <span>Author Name</span>
          <span className="inline-block w-4"></span>
          <span>01/01/2025</span>
        </div>
        <div>
          {/* Tags */}
        </div>
        <div className="">
          <h2 className="text-lg font-medium">Ringkasan</h2>
          <ul className="list-disc px-2 list-inside *:p-1 text-sm">
            <li>Ut arcu senectus posuere. Per maecenas conubia porttitor aptent laoreet euismod curabitur.</li>
            <li>Mollis cubilia molestie interdum aenean sollicitudin pharetra natoque nisi.</li>
            <li>Hac bibendum augue, laoreet sociosqu dui velit vulputate. Massa nec in venenatis etiam.</li>
            <li>Euismod vel. Efficitur felis nisi turpis ultrices gravida quisque metus.</li>
          </ul>
          <br />
          <h2 className="text-lg font-medium">Penatibus faucibus lorem risus vivamus phasellus iaculis congue</h2>
          <p className="mt-4 text-sm">
            Amet eros convallis vehicula vestibulum facilisis; vel taciti montes  eros. Ut cursus fringilla dapibus litora suscipit pellentesque diam.  Dolor risus habitant neque praesent congue erat hac. Laoreet bibendum  turpis curae sed maecenas diam. Penatibus faucibus lorem risus vivamus  phasellus iaculis congue. Scelerisque vulputate neque duis non porttitor suspendisse etiam fermentum vel. Odio risus luctus diam enim conubia  venenatis gravida litora. Dis massa tellus primis nibh primis eleifend feugiat.
          </p>
          <p className="mt-4 text-sm">
            Urna elementum malesuada vehicula vestibulum consequat dapibus.  Sollicitudin venenatis iaculis nisl, sit dictum interdum. Phasellus  platea et nunc id potenti orci justo egestas. Velit eget venenatis  iaculis odio per cursus purus nulla elit. Justo accumsan turpis a  adipiscing; feugiat taciti ut. Quis condimentum scelerisque rutrum  magnis mauris dapibus. Curabitur blandit malesuada; nibh quam habitant  consequat odio? Metus nunc dictum ornare porttitor litora netus mus.  Nisi magna amet hac mus nascetur nibh sagittis. Ut pharetra mauris nibh, consectetur maximus sociosqu bibendum.
          </p>
        </div>
      </main>
      <WriterInfo />
      <FooterPrimary />
    </>
  );
}

function WriterInfo() {
  const navigate = useRouter();

  return (
    <div className="h-[200px] p-4">
      <h1 className="font-medium text-lg">Tentang Penulis</h1>
      <div className="flex items-center mt-4">
        <Image src={TempProfile} alt="Image" className="aspect-square object-cover w-20 h-20" onClick={() => navigate.push('/author')}/>
        <div className="ml-2 w-2/3">
          <span className="font-medium">Nama Lengkap Penulis</span>
          <p className="text-xs">venenatis iaculis nisl, sit dictum interdum. Phasellus  platea et nunc id potenti orci justo egestas. Velit eget venenatis  iaculis odio per cursus purus nulla elit.</p>
        </div>
      </div>
    </div>
  )
}