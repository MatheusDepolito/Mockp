# Glossário de domínio imobiliário (PT-BR)

> **Status:** branch `pivot/imobiliario` — mapeamento old→new para refactor de schema, API e frontend.

## Entidades

| Antigo (parking) | Novo (imobiliário) | Negócio (PT-BR) |
| --- | --- | --- |
| `Company` | `Brokerage` | Corretora / imobiliária |
| `Garage` | `Property` | Imóvel / anúncio |
| `Address` | `Address` | Endereço do imóvel |
| `Slot` | `PropertyFeature` | Característica contável do imóvel |
| `SlotType` | `PropertyFeatureType` | Tipo da característica |
| `Manager` | `BrokerageManager` | Gestor da corretora |
| `Valet` | `Agent` | Corretor(a) operacional |
| `Customer` | `Customer` | Cliente final |
| `Booking` | `Inquiry` | Interesse / visita / negociação |
| `BookingTimeline` | `InquiryTimeline` | Histórico da jornada |
| `ValetAssignment` | `AgentAssignment` | Atribuição operacional |
| `BookingStatus` | `InquiryStatus` | Estado da jornada comercial |
| `Review` | `Review` | Avaliação |
| `Verification` | `Verification` | Verificação do anúncio |

## Enums

### `PropertyFeatureType`

- `BEDROOM`
- `BATHROOM`
- `PARKING_SPOT`
- `AIR_CONDITIONER`
- `BUILT_IN_WARDROBE`
- `FURNISHED_KITCHEN`
- `OTHER`

### `PropertyPurpose`

- `RENT`
- `SALE`
- `RENT_AND_SALE`

### `PropertyType`

- `HOUSE`
- `APARTMENT`

### `InquiryStatus`

- `INTERESTED`
- `VISIT_SCHEDULED`
- `PROPOSAL`
- `CLOSED`

## Regras de negócio (pivot)

- `Property.brokerageId` é **opcional** (corretor independente).
- `Property.responsibleAgentId` identifica o corretor responsável pelo imóvel.
- `Agent.brokerageId` é **opcional** (corretor pode atuar solo ou vinculado à corretora).
- `PropertyFeature` usa `type` + `quantity` (não múltiplas linhas por contagem).

## FKs renomeadas

| Antigo | Novo |
| --- | --- |
| `companyId` | `brokerageId` |
| `garageId` | `propertyId` |
| `slotId` | removido de `Inquiry` (usa `propertyId`) |
| `bookingId` | `inquiryId` |
| `valetId` | `agentId` |
| `pickupValetId` / `returnValetId` | `assignedAgentId` |
