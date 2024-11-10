const defaultPro = {
    heading: "PayForm",
    enhancedText: "Pro",
    subtitle: `"Effortless Form & Payment Integration"`,
  };
  
  export default function BrandHeader({
    heading = defaultPro.heading,
    enhancedText = defaultPro.enhancedText,
    subtitle = defaultPro.subtitle,
  }) {
    return (
      <div className="w-full flex flex-col justify-center items-center my-4">
        <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {heading}{" "}
          <span className="text-blue-600 dark:text-blue-500">{enhancedText}</span>
        </h1>
        <p className="font-medium italic text-center">{subtitle}</p>
      </div>
    );
  }
  