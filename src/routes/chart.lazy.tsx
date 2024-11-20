import {createLazyFileRoute} from "@tanstack/react-router";
import {ChartShallowDataShape, PieChart} from "reaviz";
import Search from "../components/search.tsx";
import {useEffect, useState} from "react";
import {Gathering, Page} from "../utils/types.ts";

export const Route = createLazyFileRoute('/chart')({
  component: ChartComponent,
})

export default function ChartComponent() {
  const [gatherings, setGatherings] = useState<Page<Gathering> | null>(null);
  const [data, setData] = useState<ChartShallowDataShape[]>([]);

  useEffect(() => {
    console.log('TOTO')
    if (!gatherings) return;
    const gatheringsByType = Object.groupBy(gatherings.content, ({type}) => type ?? 'PROTEST');
    const data = Object.entries(gatheringsByType).map(([gatheringType, gatherings]) => {
      return {key: gatheringType, data: gatherings.length};
    });
    setData(data);
  }, [gatherings]);

  return (
      <>
        Gatherings : {gatherings?.content.map(it => <div key={it.id}>{it.title}</div>)}
        <Search setGatherings={setGatherings}/>
        <PieChart
            height={300}
            width={300}
            data={data}
        />
        <button onClick={() => setData([{key: 'coucou', data: 19}])}>YESY</button>
      </>
  );
}
