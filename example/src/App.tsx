import { useColorScheme, ScrollView, StyleSheet, View } from 'react-native';
import {
  NeoProvider,
  DefaultLightTheme,
  DefaultDarkTheme,
  Card,
  Text,
  Badge,
  Pressable,
  Input,
  Checkbox,
  Radio,
  Switch,
} from 'rn-neo';
import { useState } from 'react';
import { getLoadedFonts } from 'expo-font';

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DefaultDarkTheme : DefaultLightTheme;

  const fonts = getLoadedFonts();
  console.log(fonts);

  return (
    <NeoProvider
      theme={theme}
      config={{
        fonts: {
          bold: 'SpaceGrotesk-Bold',
          medium: 'SpaceGrotesk-Medium',
          normal: 'SpaceGrotesk-Regular',
        },
      }}
    >
      <Showcase />
    </NeoProvider>
  );
}

function Showcase() {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState<'a' | 'b' | 'c'>('a');
  const [switchValue, setSwitchValue] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {/* ── Card ── */}
      <Section title="Card">
        <Card>
          <Text fontWeight="bold" fontSize="lg">
            Default Card
          </Text>
          <Text color="muted" fontSize="sm">
            border, shadow and surface background out of the box
          </Text>
        </Card>

        <Card backgroundColor="primary" radius="md" shadowSize="lg">
          <Text color="onPrimary" fontWeight="bold">
            Custom Card
          </Text>
          <Text color="onPrimary" fontSize="sm">
            Primary background with large shadow
          </Text>
        </Card>
      </Section>

      {/* ── Text ── */}
      <Section title="Text">
        <Text fontSize="3xl" fontWeight="bold">
          3xl bold
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          2xl bold
        </Text>
        <Text fontSize="xl" fontWeight="medium">
          xl medium
        </Text>
        <Text fontSize="lg">lg normal</Text>
        <Text fontSize="md" color="muted">
          md muted
        </Text>
        <Text fontSize="sm" color="muted">
          sm muted
        </Text>
        <Text fontSize="md" color="primary" fontWeight="bold">
          primary color
        </Text>
        <Text fontSize="md" color="secondary" fontWeight="bold">
          secondary color
        </Text>
      </Section>

      {/* ── Badge ── */}
      <Section title="Badge">
        <View style={styles.row}>
          <Badge>Default</Badge>
          <Badge size="sm" backgroundColor="success">
            Success
          </Badge>
          <Badge size="sm" backgroundColor="error">
            Error
          </Badge>
          <Badge size="sm" backgroundColor="warning">
            Warning
          </Badge>
        </View>

        <View style={styles.row}>
          <Badge size="lg" backgroundColor="secondary">
            Large
          </Badge>
          <Badge size="md" backgroundColor="primary" radius="none">
            No Radius
          </Badge>
          <Badge size="md" backgroundColor="surface" border shadow>
            Outlined
          </Badge>
        </View>
      </Section>

      {/* ── Pressable ── */}
      <Section title="Pressable">
        <Pressable border shadow onPress={() => {}}>
          <Text color="onPrimary" fontWeight="bold" align="center">
            Primary Button
          </Text>
        </Pressable>

        <Pressable
          backgroundColor="secondary"
          border
          shadow
          radius="md"
          onPress={() => {}}
        >
          <Text color="onSecondary" fontWeight="bold" align="center">
            Secondary Button
          </Text>
        </Pressable>

        <Pressable
          backgroundColor="surface"
          border
          shadow
          onPress={() => {}}
          loading
        >
          <Text fontWeight="bold" align="center">
            Loading State
          </Text>
        </Pressable>

        <Pressable
          backgroundColor="surface"
          border
          shadow
          onPress={() => {}}
          disabled
        >
          <Text fontWeight="bold" align="center" color="muted">
            Disabled State
          </Text>
        </Pressable>
      </Section>

      {/* ── Input ── */}
      <Section title="Input">
        <Input
          placeholder="Default input"
          value={inputValue}
          onChangeText={setInputValue}
          border
          shadow
          backgroundColor="surface"
        />

        <Input
          placeholder="With radius"
          border
          shadow
          radius="md"
          backgroundColor="surface"
        />

        <Input
          placeholder="Large shadow on focus"
          border
          shadow
          shadowSize="lg"
          backgroundColor="surface"
        />
      </Section>

      {/* ── Checkbox ── */}
      <Section title="Checkbox">
        <View style={styles.row}>
          <Checkbox
            checked={checkboxValue}
            onChange={setCheckboxValue}
            border
            shadow
          />
          <Text>{checkboxValue ? 'Checked' : 'Unchecked'}</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            checked={true}
            onChange={() => {}}
            size="sm"
            border
            shadow
          />
          <Checkbox
            checked={true}
            onChange={() => {}}
            size="md"
            border
            shadow
          />
          <Checkbox
            checked={true}
            onChange={() => {}}
            size="lg"
            border
            shadow
          />
        </View>

        <View style={styles.row}>
          <Checkbox
            checked={false}
            onChange={() => {}}
            border
            shadow
            disabled
          />
          <Text color="muted">Disabled</Text>
        </View>

        <View style={styles.row}>
          <Checkbox
            checked={true}
            onChange={() => {}}
            border
            shadow
            backgroundColor={{ true: 'secondary', false: 'surface' }}
            checkColor={{ true: 'onSecondary', false: 'transparent' }}
          />
          <Text>Custom colors</Text>
        </View>
      </Section>

      {/* ── Radio ── */}
      <Section title="Radio">
        <View style={styles.row}>
          {(['a', 'b', 'c'] as const).map((v) => (
            <View key={v} style={styles.radioItem}>
              <Radio
                selected={radioValue === v}
                onChange={() => setRadioValue(v)}
                border
                shadow
                radius="full"
              />
              <Text>{v.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.row}>
          <Radio
            selected={true}
            onChange={() => {}}
            size="sm"
            border
            shadow
            radius="full"
          />
          <Radio
            selected={true}
            onChange={() => {}}
            size="md"
            border
            shadow
            radius="full"
          />
          <Radio
            selected={true}
            onChange={() => {}}
            size="lg"
            border
            shadow
            radius="full"
          />
        </View>

        <View style={styles.row}>
          <Radio
            selected={true}
            onChange={() => {}}
            border
            shadow
            radius="full"
            backgroundColor={{ true: 'secondary', false: 'surface' }}
            innerColor={{ true: 'onSecondary', false: 'transparent' }}
          />
          <Text>Custom colors</Text>
        </View>
      </Section>

      {/* ── Switch ── */}
      <Section title="Switch">
        <View style={styles.row}>
          <Switch
            value={switchValue}
            onChange={setSwitchValue}
            border
            shadow
            radius="full"
          />
          <Text>{switchValue ? 'On' : 'Off'}</Text>
        </View>

        <View style={styles.row}>
          <Switch
            value={true}
            onChange={() => {}}
            size="sm"
            border
            shadow
            radius="full"
          />
          <Switch
            value={true}
            onChange={() => {}}
            size="md"
            border
            shadow
            radius="full"
          />
          <Switch
            value={true}
            onChange={() => {}}
            size="lg"
            border
            shadow
            radius="full"
          />
        </View>

        <View style={styles.row}>
          <Switch
            value={true}
            onChange={() => {}}
            border
            shadow
            radius="full"
            backgroundColor={{ true: 'success', false: 'muted' }}
            thumbColor={{ true: 'onSuccess', false: 'onPrimary' }}
          />
          <Text>Custom colors</Text>
        </View>

        <View style={styles.row}>
          <Switch
            value={false}
            onChange={() => {}}
            border
            shadow
            radius="full"
            disabled
          />
          <Text color="muted">Disabled</Text>
        </View>
      </Section>
    </ScrollView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text fontSize="xl" fontWeight="bold" style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  sectionContent: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
