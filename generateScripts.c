#define _CRT_SECURE_NO_WARNINGS
#define generateId(id, i, j, maxJ) (id) = (i) * (maxJ) + (j) + (1)
#define sizeofMatrix(m) (sizeof((m)) / sizeof((m[0])))

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

void generateBirthDate(char* birthDate);
void generateTelephoneNumber(char* telephoneNumber);
void generateAddress(char* address, int citiesSize, char* cities[], int streetsSize, char* streets[]);
void generateName(char* name, int firstNameSize, char* firstName[], int lastNameSize, char* lastName[]);
void generateEmail(char* email, char* name, int emailProvidersSize, char* emailProviders[]);

int main(int argc, char** argv)
{
	srand(time(NULL));

	int inserts_no = 10;
	int batches_no = 10;

	char generateClients = 0;
	char generateCouriers = 0;
	char generateProducts = 0;
	char generateShops = 0;
	char generateShopsCouriers = 0;
	char generateTransactions = 0;

	for (int i = 2; i <= argc; i++)
	{
		argv++;
		if (strcmp(*argv, "-i") == 0 || strcmp(*argv, "-b") == 0)
		{
			if (i == argc)
				goto cleanup;
			i++;
			argv++;
			int no = 0;
			for (char* x = *argv; *x; x++)
			{
				if (*x < '0' || *x > '9')
					goto cleanup;
				no = no * 10 + (*x - '0');
			}
			if (no == 0)
			{
				printf("Number needs to be greater than zero!\n");
				return -1;
			}
			if (strcmp(*(argv - 1), "-i") == 0)
				inserts_no = no;
			else
				batches_no = no;
		}
		else if (strcmp(*argv, "--clients") == 0)
		{
			generateClients = 1;
		}
		else if (strcmp(*argv, "--couriers") == 0)
		{
			generateCouriers = 1;
		}
		else if (strcmp(*argv, "--products") == 0)
		{
			generateProducts = 1;
		}
		else if (strcmp(*argv, "--shops") == 0)
		{
			generateShops = 1;
		}
		else if (strcmp(*argv, "--shops_couriers") == 0)
		{
			generateShopsCouriers = 1;
		}
		else if (strcmp(*argv, "--transactions") == 0)
		{
			generateTransactions = 1;
		}
		else
		{
		cleanup:
			printf("Usage: -i numberOfInserts -b numberOfBatches --clients --couriers --products\
			 --shops_couriers --transactions\n");
			return -1;
		}
	}

	int total_no = inserts_no * batches_no;
	
	char* cities[] = {
		"New York", "Los Angeles", "Washington", "Boston", "Detroit", "Miami",
		"Chicago", "San Francisco", "Seattle", "Houston", "Dallas", "Atlanta",
		"Philadelphia", "Denver", "San Diego", "Phoenix", "Las Vegas", "New Orleans",
		"Portland", "Nashville", "Minneapolis", "Charlotte", "Indianapolis", "Kansas City",
		"Cleveland", "Memphis", "St. Louis", "Baltimore", "Salt Lake City", "Austin",
		"San Antonio", "Orlando", "Tampa", "Sacramento", "Charlotte", "Columbus",
		"Pittsburgh", "Oakland", "Albuquerque", "Omaha", "Honolulu", "Madison"
	};

	char* streets[] = {
		"Main Street", "Broadway", "Wall Street", "Fifth Avenue", "Rodeo Drive", "Hollywood Boulevard",
		"Michigan Avenue", "Lombard Street", "Pike Place", "Beale Street", "Greenville Avenue", "Peachtree Street",
		"South Street", "Larimer Square", "Gaslamp Quarter", "Camelback Road", "The Strip", "Bourbon Street",
		"Hawthorne Boulevard", "Broadway", "Hennepin Avenue", "Trade Street", "Meridian Street", "Grand Boulevard",
		"Euclid Avenue", "Beale Street", "The Delmar Loop", "Charles Street", "Main Street", "Sixth Street",
		"State Street", "Sunset Boulevard", "Collins Avenue", "Pennsylvania Avenue", "Rush Street", "Pico Boulevard",
		"Market Street", "Elm Street", "Canal Street", "Church Street", "Santa Monica Boulevard", "Haight Street"
	};

	char* firstName[] = {
		"Emily", "Olivia", "Emma", "Ava", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper",
		"Evelyn", "Abigail", "Ella", "Elizabeth", "Sofia", "Madison", "Avery", "Mila", "Aria", "Scarlett",
		"Grace", "Chloe", "Victoria", "Riley", "Aubrey", "Zoey", "Lily", "Hannah", "Samantha", "Layla",
		"Daniel", "David", "William", "Mason", "Ethan", "Michael", "Jacob", "Noah", "Liam", "Oliver",
		"Alexander", "Lucas", "Benjamin", "Elijah", "James", "Logan", "Aiden", "Caleb", "Caden", "Jackson",
		"Gabriel", "Nicholas", "John", "Samuel", "Matthew", "Luke", "Joseph", "Andrew", "Owen", "Max"
	};

	char* lastName[] = {
		"Smith", "Johnson", "Williams", "Jones", "Brown", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
		"Hernandez", "Lopez", "Gonzalez", "Perez", "Jackson", "Harris", "Clark", "Lewis", "Allen", "Young",
		"Walker", "Hall", "Green", "Baker", "Adams", "Nelson", "Carter", "Mitchell", "Parker", "Collins",
		"King", "Scott", "Wright", "Lee", "Turner", "Campbell", "Gomez", "Reed", "Phillips", "Morgan",
		"Cooper", "Peterson", "Perry", "Powell", "Long", "Bryant", "James", "Watson", "Evans", "Foster",
		"Gordon", "Ramos", "Washington", "Butler", "Simmons", "Frazier", "Murray", "Sanders", "Webb", "Hunter"
	};

	char* companyFirstNames[] = {
		"Avalon", "Bluebird", "Catalyst", "Dreamscape", "Everest", "Frontier", "Galaxy", "Horizon", "Innovative", "Journey",
		"Kaleidoscope", "Legacy", "Momentum", "Nebula", "Odyssey", "Pinnacle", "Quest", "Radiance", "Summit", "Tranquility",
		"Uplift", "Velocity", "Wavelength", "Xenith", "Yellowstone", "Zenith", "Ascent", "Bridge", "Crescent", "Daybreak",
		"Elevate", "Foothills", "Gateway", "Harbor", "Island", "Junction", "Keystone", "Lighthouse", "Mirage", "Nexus"
	};

	char* companyLastNames[] = {
		"Enterprises", "Industries", "Corporation", "Group", "Holdings", "Limited", "Solutions", "International", "Services", "Inc",
		"Ventures", "Partners", "Consulting", "Logistics", "Commerce", "Development", "Technologies", "Management", "Associates", "Innovations",
		"Investments", "Capital", "Marketing", "Trading", "Global", "Network", "Alliance", "Resources", "Systems", "Strategy",
		"Enterprize", "Agency", "Association", "Federation", "Foundation", "Fund", "Institute", "Trust", "Union", "United"
	};

	char* guitarTypes[] = {
		"acoustic", "electric", "electro-acoustic", "classical"
	};


	char* emailProviders[] = {
		"gmail.com", "yahoo.com", "outlook.com", "hotmail.com"
	};

	char* colors[] = {
		"red", "green", "blue", "yellow", "purple", "pink", "orange", "black", "white", "gray"
	};

	char* guitarFirstNames[] = {
		"Stratocaster", "Telecaster", "Les Paul", "SG", "Explorer", "Flying V", "Firebird", "Jaguar", "Jazzmaster", "Duo-Sonic",
		"Mustang", "Rickenbacker", "Gibson", "Fender", "Epiphone"
	};

	char* guitarLastNames[] = {
		"Standard", "Deluxe", "Custom", "Signature", "Artist", "Classic", "Vintage", "Modern", "Elite", "Plus",
		"Ultra", "Special", "Pro", "Original", "Limited"
	};


	int id = 0;
	char address[256] = { 0 };
	char birthDate[11] = { 0 };
	char email[65] = { 0 };
	char name[65] = { 0 };
	char telephoneNumber[11] = { 0 };

	FILE* clients_file = NULL;
	FILE* couriers_file = NULL;
	FILE* products_file = NULL;
	FILE* shops_file = NULL;
	FILE* shops_couriers_file = NULL;
	FILE* transactions_file = NULL;

	if (generateClients)
		clients_file = fopen("generate_clients.sql", "w");
	if (generateCouriers)
		couriers_file = fopen("generate_couriers.sql", "w");
	if (generateShops)
		shops_file = fopen("generate_shops.sql", "w");
	if (generateProducts)
		products_file = fopen("generate_products.sql", "w");
	if (generateShopsCouriers)
		shops_couriers_file = fopen("generate_shops_couriers.sql", "w");
	if (generateTransactions)
		transactions_file = fopen("generate_transactions.sql", "w");

	for (int i = 0; i < inserts_no; i++)
	{	
		if (generateClients)
		{
			fprintf(clients_file,
				"INSERT INTO client(id,address,birth_date,email,name,telephone_number) VALUES ");
			for (int j = 0; j < batches_no; j++)
			{
				generateId(id, i, j, batches_no);
				generateAddress(address, sizeofMatrix(cities), cities, sizeofMatrix(streets), streets);
				generateBirthDate(birthDate);
				generateName(name, sizeofMatrix(firstName), firstName, sizeofMatrix(lastName), lastName);
				generateEmail(email, name, sizeofMatrix(emailProviders), emailProviders);
				generateTelephoneNumber(telephoneNumber);

				fprintf(
					clients_file,
					"(%d,'%s','%s','%s','%s','%s')",
					id, address, birthDate, email, name, telephoneNumber
				);
				fprintf(clients_file, j < batches_no - 1 ? "," : ";\n");
			}
		}

		if (generateCouriers)
		{
			fprintf(couriers_file,
				"INSERT INTO courier(id,address,delivery_price,email,name,telephone_number) VALUES ");
			for (int j = 0; j < batches_no; j++)
			{
				generateId(id, i, j, batches_no);
				generateAddress(address, sizeofMatrix(cities), cities, sizeofMatrix(streets), streets);
				generateName(name, sizeofMatrix(companyFirstNames), 
					companyFirstNames, sizeofMatrix(companyLastNames), companyLastNames);
				generateEmail(email, name, sizeofMatrix(emailProviders), emailProviders);
				generateTelephoneNumber(telephoneNumber);

				fprintf(
					couriers_file,
					"(%d,'%s',%d,'%s','%s','%s')",
					id, address, rand() % 200 + 30, email, name, telephoneNumber
				);
				fprintf(couriers_file, j < batches_no - 1 ? "," : ";\n");
			}
		}

		if (generateShops)
		{
			fprintf(shops_file,
				"INSERT INTO shop(id,address,email,name,shipping_available,telephone_number) VALUES ");
			for (int j = 0; j < batches_no; j++)
			{
				generateId(id, i, j, batches_no);
				generateAddress(address, sizeofMatrix(cities), cities, sizeofMatrix(streets), streets);
				generateName(name, sizeofMatrix(companyFirstNames),
					companyFirstNames, sizeofMatrix(companyLastNames), companyLastNames);
				generateEmail(email, name, sizeofMatrix(emailProviders), emailProviders);
				generateTelephoneNumber(telephoneNumber);

				fprintf(
					shops_file,
					"(%d,'%s','%s','%s','%s','%s')",
					id, address, email, name, rand() % 4 == 0 ? "f" : "t", telephoneNumber
				);
				fprintf(shops_file, j < batches_no - 1 ? "," : ";\n");
			}
		}

		if (generateProducts)
		{
			fprintf(products_file,
				"INSERT INTO product(dtype,id,price,color,creation_year,model,type,shop_id) VALUES ");
			for (int j = 0; j < batches_no; j++)
			{
				generateId(id, i, j, batches_no);
				generateName(name, sizeofMatrix(guitarFirstNames),
					guitarFirstNames, sizeofMatrix(guitarLastNames), guitarLastNames);

				fprintf(
					products_file,
					"('%s',%d,%d,'%s',%d,'%s','%s',%d)",
					"Guitar", 
					id, 
					rand() % 3000 + 1000, 
					colors[rand() % sizeofMatrix(colors)],
					rand() % 20 + 2000, 
					name,
					guitarTypes[rand() % sizeofMatrix(guitarTypes)],
					rand() % total_no + 1
				);
				fprintf(products_file, j < batches_no - 1 ? "," : ";\n");
			}
		}

		if (generateShopsCouriers)
		{
			int total = total_no < 10 ? total_no : 10;
			fprintf(shops_couriers_file, "INSERT INTO shop_courier(shop_id,courier_id) VALUES ");
			for (int j = 0; j < batches_no; j++)
			{
				generateId(id, i, j, batches_no); // shop_id
				for (int index = 1; index <= total; index++)
				{
					fprintf(
						shops_couriers_file, 
						"(%d,%d)",
						id,
						rand() % total_no + 1
					);
					fprintf(shops_couriers_file, (j < batches_no - 1) || (index < total) ? "," : ";\n");
				}
			}
		}

		if (generateTransactions)
		{
			fprintf(transactions_file, 
				"INSERT INTO transaction(id,date,is_cash_payment,client_id,product_id) VALUES ");
			for (int j = 0; j < batches_no; j++)
			{
				generateId(id, i, j, batches_no); // product_id and id
				generateBirthDate(birthDate);
				fprintf(
					transactions_file,
					"(%d,'%s','%s',%d,%d)",
					id,
					birthDate,
					rand() % 3 == 0 ? "t" : "f",
					rand() % total_no + 1,
					id
				);
				fprintf(transactions_file, j < batches_no - 1 ? "," : ";\n");
			}
		}
	}

	if (generateClients)
		fclose(clients_file);
	if (generateCouriers)
		fclose(couriers_file);
	if (generateShops)
		fclose(shops_file);
	if (generateProducts)
		fclose(products_file);
	if (generateShopsCouriers)
		fclose(shops_couriers_file);
	if (generateTransactions)
		fclose(transactions_file);
	return 0;
}


void generateBirthDate(char* birthDate)
{
	sprintf(birthDate, "%02d-%02d-%d", rand() % 28 + 1, rand() % 12 + 1, rand() % 45 + 1960);
}

void generateTelephoneNumber(char* telephoneNumber)
{
	strcpy(telephoneNumber, "07");
	for (int index = 2; index < 10; index++)
		telephoneNumber[index] = (rand() % 10) + '0';
}

void generateAddress(char* address, int citiesSize, char* cities[], int streetsSize, char* streets[])
{
	sprintf(
		address, 
		"%s, %s %d",
		cities[rand() % citiesSize],
		streets[rand() % streetsSize],
		rand() % 200 + 1
	);
}

void generateName(char* name, int firstNameSize, char* firstName[], int lastNameSize, char* lastName[])
{
	sprintf(name, "%s %s", firstName[rand() % firstNameSize], lastName[rand() % lastNameSize]);
}

void generateEmail(char* email, char* name, int emailProvidersSize, char* emailProviders[])
{
	while (*name)
	{
		if (*name >= 'A' && *name <= 'Z')
			*email = (*name - 'A') + 'a', email++;
		else if (*name != ' ')
			*email = *name, email++;
		name++;
	}
	*email = '@';
	email++;
	*email = '\0';
	strcat(email, emailProviders[rand() % emailProvidersSize]);
}