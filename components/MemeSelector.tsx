import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { Center, Heading, Image, Pressable, Row } from "native-base";

type Props = {
  activeMeme?: string;
  onSelect: (meme: Meme) => void;
};

const MemeSelector = ({ activeMeme, onSelect }: Props) => {
  const { getMemes } = useApi();
  const [memes, setMemes] = useState<Meme[] | null>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      const results = await getMemes();
      setMemes(results);
    };

    fetchMemes();
  }, []);

  const memeSelected = (meme: Meme) => {
    onSelect(meme);
  };

  return (
    <>
      {memes && (
        <>
          <Center>
            <Heading color={"gray.500"}>Select your Meme</Heading>
          </Center>
          <Row
            flexWrap="wrap"
            justifyContent="center"
            my={6}
            style={{ gap: 2 }}
          >
            {memes?.map((meme: Meme, index: number) => (
              <Pressable
                key={index.toString()}
                onPress={() => memeSelected(meme)}
                rounded="md"
              >
                <Image
                  source={meme.image}
                  alt={meme.name}
                  resizeMode="cover"
                  size="lg"
                  borderColor="secondary.900"
                  borderWidth={activeMeme === meme.name ? 4 : 0}
                  borderRadius={8}
                />
              </Pressable>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default MemeSelector;
