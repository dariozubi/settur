import Text from '@/components/Text'
import Button from '@/components/Button'
import Card from '@/components/Card'

function HomeCardSection() {
  return (
    <section className="bg-darkish flex">
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap">
        <div className="w-5/12 text-balance py-16 text-center">
          <Text from="Home" variant="lg" isRichText className="text-light">
            solutions
          </Text>
        </div>

        <div className="flex w-full p-24">
          <Card className="mr-6 w-1/3">
            <Card.Image
              className="aspect-[1775/1057]"
              src="/img/escalade.png"
              alt="escalade"
            />

            <Card.Header from="Home" className="mb-4 mt-10">
              private
            </Card.Header>

            <Card.Content from="Home" className="mb-10 text-center">
              private-text
            </Card.Content>

            <Button from="Home" className="w-fit">
              learn-more
            </Button>
          </Card>

          <Card className="mx-6 w-1/3">
            <Card.Image
              className="-mt-10 aspect-[747/567]"
              src="/img/sprinter.png"
              alt="sprinter"
            />

            <Card.Header from="Home" className="mb-4 mt-10">
              shared
            </Card.Header>

            <Card.Content from="Home" className="mb-10 text-center">
              shared-text
            </Card.Content>

            <Button from="Home" className="w-fit">
              learn-more
            </Button>
          </Card>

          <Card className="ml-6 w-1/3">
            <Card.Image
              className="-mt-4 aspect-[1920/1277]"
              src="/img/autobus.png"
              alt="motor coach"
            />

            <Card.Header from="Home" className="mb-4 mt-10">
              groups
            </Card.Header>

            <Card.Content from="Home" className="mb-10 text-center">
              groups-text
            </Card.Content>

            <Button from="Home" className="w-fit">
              learn-more
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomeCardSection
